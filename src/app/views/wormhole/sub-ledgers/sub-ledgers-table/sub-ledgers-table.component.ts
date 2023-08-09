import { SubLedgersService } from 'src/app/services/sub-ledgers/sub-ledgers.service';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sub-ledgers-table',
    templateUrl: './sub-ledgers-table.component.html',
    styleUrls: ['./sub-ledgers-table.component.scss'],
})
export class SubLedgersTableComponent implements OnChanges {
    @Input() name;

    isLoading = true;
    reportPresetId: number = null;

    constructor(
        public subLedgersService: SubLedgersService,
        public router: Router,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.isLoading = true;
        this.reportPresetId = null;
        this.subLedgersService
            .getReportPresetIdByNameFromGlobalScope(this.name)
            .subscribe((id) => {
                if (id) {
                    this.reportPresetId = id;
                    this.router.navigate([], {
                        queryParams: {
                            reportPresetId: id,
                            pageIndex: undefined,
                            pageSize: undefined,
                            generalTableSorting: undefined,
                            sortingDeFiImpactBy: undefined,
                            tableView: 'transactions',
                            subLedgerTableView: this.name,
                        },
                        queryParamsHandling: 'merge',
                    });
                }
                this.isLoading = false;
            });
    }
}
