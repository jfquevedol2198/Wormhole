import * as moment from 'moment';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
    IBlockchainMessagesData,
    ICombinedBlockchainMessagesData,
} from 'src/app/interfaces/blockchainMessages';
import { SubLedgersService } from 'src/app/services/sub-ledgers/sub-ledgers.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IPaginationParams } from '../../../../interfaces/paginationParams.interface';
import { IRange } from '../../../../interfaces/range.interface';
import {
    ISortColumn,
    SortDirection,
} from '../../../../interfaces/sort-column.interface';
import { IBlockNumberRange } from '../../../../interfaces/transaction.interface';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { getSortQuery } from '../../../../utilities/getSortQuery';
import { messagesColumns } from './messages-columns';

export class BlockchainMessagesData implements IBlockchainMessagesData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = ['timestamp asc'];
}

@Component({
    selector: 'app-sub-ledgers-messages',
    templateUrl: './sub-ledgers-messages.component.html',
    styleUrls: ['./sub-ledgers-messages.component.scss'],
})
export class SubLedgersMessagesComponent implements OnInit {
    subscriptions = new Subscription();

    blockchainMessagesData = new BlockchainMessagesData();
    messagesColumns = messagesColumns;
    isPaginatedTable = true;
    sortColumns: ISortColumn[] = [];
    isBlockchainMessagesLoading = true;

    constructor(
        public subLedgersService: SubLedgersService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountingService: AccountingService,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    map((queryParams) => [
                        queryParams.portfolioId,
                        queryParams.fromDate,
                        queryParams.toDate,
                        queryParams.pageIndex ? +queryParams.pageIndex : 0,
                        queryParams.pageSize ? +queryParams.pageSize : 50,
                        queryParams.subLedgerSorting
                            ? JSON.parse(queryParams.subLedgerSorting)
                            : ['timestamp asc'],
                    ]),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isBlockchainMessagesLoading = true)),
                    map(
                        ([
                            portfolioId,
                            fromDate,
                            toDate,
                            pageIndex,
                            pageSize,
                            sorting,
                        ]): ICombinedBlockchainMessagesData => {
                            return {
                                portfolioId,
                                range: {
                                    left: moment.utc(fromDate).toDate(),
                                    right: moment.utc(toDate).toDate(),
                                },
                                paginationParams: {
                                    pageIndex,
                                    pageSize,
                                },
                                blockNumberRange: {},
                                sorting,
                            };
                        },
                    ),
                    switchMap((data) =>
                        this.processFromDate(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.blockNumberRange,
                            data.sorting,
                        ),
                    ),
                    switchMap((data) =>
                        this.processToDate(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.blockNumberRange,
                            data.sorting,
                        ),
                    ),
                    switchMap((data) =>
                        this.subLedgersService.getBlockchainMessages(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.sorting,
                            data.blockNumberRange,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.blockchainMessagesData = {
                        ...data,
                        data: data.data,
                        total: data.total,
                        pageIndex: data.paginationParams.pageIndex,
                        pageSize: data.paginationParams.pageSize,
                    };
                    this.sortColumns = data.sorting.map((column) => {
                        return {
                            columnDef: column.split(' ')[0],
                            direction: column.split(' ')[1] as SortDirection,
                        };
                    });
                    this.isBlockchainMessagesLoading = false;
                }),
        );
    }

    private processFromDate(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        blockNumberRange: IBlockNumberRange,
        sorting: string[],
    ): Observable<ICombinedBlockchainMessagesData> {
        if (range.left) {
            return this.accountingService
                .getBlockNumber(range.left as Date)
                .pipe(
                    map((blockNumber) => {
                        blockNumberRange['left'] = blockNumber;
                        return {
                            portfolioId,
                            range,
                            paginationParams,
                            blockNumberRange,
                            sorting,
                        };
                    }),
                );
        }

        return of({
            portfolioId,
            range,
            paginationParams,
            blockNumberRange,
            sorting,
        });
    }

    private processToDate(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        blockNumberRange: IBlockNumberRange,
        sorting: string[],
    ): Observable<ICombinedBlockchainMessagesData> {
        if (range.right) {
            return this.accountingService
                .getBlockNumber(range.right as Date)
                .pipe(
                    map((blockNumber) => {
                        blockNumberRange['right'] = blockNumber;
                        return {
                            portfolioId,
                            range,
                            paginationParams,
                            blockNumberRange,
                            sorting,
                        };
                    }),
                );
        }

        return of({
            portfolioId,
            range,
            paginationParams,
            blockNumberRange,
            sorting,
        });
    }

    sort(sortParams: any) {
        const sortQuery = getSortQuery(
            sortParams.isButtonPressed,
            sortParams.columnDef,
            this.sortColumns,
        );

        this.sortColumns = sortQuery.sortColumns;

        this.router.navigate([], {
            queryParams: {
                subLedgerSorting: sortQuery.sortQuery,
            },
            queryParamsHandling: 'merge',
        });
    }
}
