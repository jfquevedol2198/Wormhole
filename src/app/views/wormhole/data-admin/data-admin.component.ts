import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralLedgerService } from '../general-ledger/general-ledger.service';

@Component({
    selector: 'app-data-admin',
    templateUrl: './data-admin.component.html',
    styleUrls: ['./data-admin.component.scss'],
})
export class DataAdminComponent implements OnInit {
    dataAdminTabs = [
        {
            label: 'Platforms',
            subTabs: [
                { label: 'Platforms', tabId: 6 },
                { label: 'Jobs', tabId: 7 },
            ],
            tabId: 1,
        },
        {
            label: 'Address Labels',
            subTabs: [
                { label: 'Address Labels', tabId: 8 },
                { label: 'Jobs', tabId: 9 },
            ],
            tabId: 2,
        },
        {
            label: 'Method Definitions',
            subTabs: [
                { label: 'Method Definitions', tabId: 10 },
                { label: 'Jobs', tabId: 11 },
            ],
            tabId: 3,
        },
        {
            label: 'Market Data',
            subTabs: [
                { label: 'Providers', tabId: 12 },
                { label: 'Providers Jobs', tabId: 13 },
                { label: 'Currency Pairs', tabId: 14 },
                { label: 'Market To Market', tabId: 15 },
            ],
            tabId: 4,
        },
        { label: 'Ethereum', subTabs: [], tabId: 5 },
    ];
    selectedTab = {
        label: 'Platforms',
        subTabs: [
            { label: 'Platforms', tabId: 6 },
            { label: 'Jobs', tabId: 7 },
        ],
        tabId: 1,
    };
    selectedSubTab = {
        label: 'Platforms',
        tabId: 6,
    };
    activeTabIndex = 0;
    activeSubTabIndex = 0;

    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
    ) {}

    setActiveTab(tabIndex: number) {
        this.activeTabIndex = tabIndex;
        this.activeSubTabIndex = 0;
        this.selectedTab = this.dataAdminTabs[tabIndex];
        this.selectedSubTab = this.dataAdminTabs[tabIndex].subTabs[0];
    }

    setActiveSubTab(tabIndex: number) {
        this.activeSubTabIndex = tabIndex;
        this.selectedSubTab = this.dataAdminTabs[this.activeTabIndex].subTabs[tabIndex];
    }

    ngOnInit(): void {}
}
