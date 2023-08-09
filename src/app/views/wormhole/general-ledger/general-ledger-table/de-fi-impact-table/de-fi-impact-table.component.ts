import { Subscription } from 'rxjs';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { detailExpand } from '../../../../../animations/detailExpand';
import {
    IColumn,
    IInnerColumn,
} from '../../../../../interfaces/column.interface';
import { IPNLPriceMovement } from '../../../../../interfaces/pnlPriceMovement.interface';
import {
    ISortColumn,
    SortDirection,
} from '../../../../../interfaces/sort-column.interface';
import {
    dbColumnNameToDeFiImpactColumnName,
    defiImpactColumnNameToDBColumnName,
} from '../../../../../utilities/defiImpactColumnNameConversion';
import { getSortQuery } from '../../../../../utilities/getSortQuery';
import {
    DeFiImpactData,
    GeneralLedgerService,
} from '../../general-ledger.service';
import {
    deFiImpactColumns,
    innerDeFiImpactColumns,
} from './de-fi-impact-columns';

@Component({
    selector: 'app-de-fi-impact-table',
    templateUrl: './de-fi-impact-table.component.html',
    styleUrls: ['de-fi-impact-table.component.scss'],
    animations: [detailExpand],
})
export class DeFiImpactTableComponent implements OnInit, OnDestroy {
    @Input() paginationDisabled: boolean;

    deFiImpactTableDataSubscription = new Subscription();
    deFiImpactData: DeFiImpactData = new DeFiImpactData();

    columns: IColumn[] = deFiImpactColumns;
    innerColumns: IInnerColumn[] = innerDeFiImpactColumns;
    sortColumns: ISortColumn[] = [];
    displayedColumns: string[];
    displayedInnerColumns: string[];

    constructor(
        public generalLedgerService: GeneralLedgerService,
        public activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.displayedColumns = this.columns.map((column) => column.columnDef);
        this.displayedInnerColumns = this.innerColumns.map(
            (column) => column.columnDef,
        );

        this.deFiImpactTableDataSubscription.add(
            this.generalLedgerService.deFiImpactData$.subscribe((data) => {
                this.deFiImpactData = data;
                this.sortColumns = data.sorting.map((column) => {
                    return {
                        columnDef: dbColumnNameToDeFiImpactColumnName(
                            column.split(' ')[0],
                            this.deFiImpactData.sortingBy,
                        ),
                        direction: column.split(' ')[1] as SortDirection,
                    };
                });
            }),
        );
    }

    ngOnDestroy() {
        this.deFiImpactTableDataSubscription.unsubscribe();
    }

    expandPNLPriceMovement(pnlPriceMovement: IPNLPriceMovement) {
        pnlPriceMovement.isExpanded = !pnlPriceMovement.isExpanded;
    }

    page(pageIndex: number, pageSize: number) {
        this.router.navigate([], {
            queryParams: {
                pageIndex,
                pageSize,
            },
            queryParamsHandling: 'merge',
        });
    }

    sort(isButtonPressed: boolean, columnDef: string) {
        const sortQuery = getSortQuery(
            isButtonPressed,
            columnDef,
            this.sortColumns,
        );

        this.sortColumns = sortQuery.sortColumns;

        const advancedSortQuery = this.sortColumns.map((column) => {
            return (
                defiImpactColumnNameToDBColumnName(
                    column.columnDef,
                    this.deFiImpactData.sortingBy,
                ) +
                ' ' +
                column.direction
            );
        });

        this.router.navigate([], {
            queryParams: {
                generalTableSorting: JSON.stringify(advancedSortQuery),
            },
            queryParamsHandling: 'merge',
        });
    }
}
