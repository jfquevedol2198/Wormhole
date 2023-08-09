import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralLedgerService } from '../general-ledger/general-ledger.service';

@Component({
    selector: 'app-processing',
    templateUrl: './processing.component.html',
    styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
    tableView: 'profitAndLoss' | 'jobs' = 'profitAndLoss';
    processingTabs = [{ label: 'Profit And Loss' }, { label: 'Jobs' }];
    paginationDisabled = false;
    selectedTab = { label: 'Profit And Loss' };
    activeTabIndex = 0;
    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.tableView =
            this.activatedRoute.snapshot.queryParams.tableView ||
            'profitAndLoss';
        this.onViewChange(this.activeTabIndex);
    }

    onViewChange(tabIndex: number) {
        this.tableView = tabIndex === 0 ? 'profitAndLoss' : 'jobs';
        this.router.navigate([], {
            queryParams: {
                tableView: this.tableView,
                pageIndex: undefined,
                generalTableSorting: undefined,
                sortingDeFiImpactBy: undefined,
                reportPresetId: undefined,
            },
            queryParamsHandling: 'merge',
        });
    }
}
