import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralLedgerService } from '../general-ledger/general-ledger.service';

@Component({
    selector: 'app-sub-ledgers',
    templateUrl: './sub-ledgers.component.html',
    styleUrls: ['./sub-ledgers.component.scss'],
})
export class SubLedgersComponent implements OnInit {
    subLedgersTabs = [
        { label: 'Funding' },
        { label: 'Wallet' },
        { label: 'Staked' },
        { label: 'Borrowed' },
        { label: 'Liquidated' },
        { label: 'Messages' },
        { label: 'NFT' },
    ];

    selectedTab = { label: 'Funding' };
    activeTabIndex = 0;

    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.selectedTab = {
            label:
                this.activatedRoute.snapshot.queryParams.subLedgerTableView ||
                'Funding',
        };

        this.subLedgersTabs.forEach((tab, index) => {
            if (tab.label === this.selectedTab.label) {
                this.activeTabIndex = index;
            }
        });
    }

    setActiveTab(tabIndex: number) {
        this.activeTabIndex = tabIndex;
        this.selectedTab = this.subLedgersTabs[tabIndex];
    }
}
