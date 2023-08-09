import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { darkTheme } from '../../../../../constants/time-picker-theme';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

import {
    CurrencyPairData,
    DataAdminService,
} from 'src/app/services/data-admin/data-admin.service';
import { select } from 'd3';
import { IDataAdminCurrencyPair } from 'src/app/interfaces/dataadminCurrencyPairs.interface';

@Component({
    selector: 'app-data-admin-currency-pairs',
    templateUrl: './data-admin-currency-pairs.component.html',
    styleUrls: ['./data-admin-currency-pairs.component.css'],
})
export class DataAdminCurrencyPairsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    currencyPairData: CurrencyPairData = new CurrencyPairData();
    isFilterOpen: boolean = false;
    filtersForm: FormGroup;
    timePickerTheme: NgxMaterialTimepickerTheme

    columnsToDisplay = [
        'status',
        'pairName',
        'rateCount',
        'baseTokenContractAddress',
        'tokenContractAddress',
        // 'tokenDependency',
        'firstSeenBlockNumber',
        'firstSeenTimestamp',
        'lastSeenBlockNumber',
        'lastSeenTimestamp',
        'syncedBlockNumber',
        'syncedTimestamp',
        'verifiedBlockNumber',
        'verifiedTimestamp',
        'active',
        'requested',
    ];

    currencyPairsTabs = [
        {
            label: 'Pair Summary',
            tabId: 1,
        },
        {
            label: 'Dependencies',
            tabId: 2,
        },
        {
            label: 'Usage',
            tabId: 3,
        },
        {
            label: 'Jobs',
            tabId: 4,
        },
        {
            label: 'Processing Log',
            tabId: 5
        }
    ];

    currencyIcon = {
        "Running": "info_outline",
        "Scheduled": "error_outline",
        "Failed": "highlight_off",
        "Completed": "check_circle_outline",
    }

    selectedTab = {
        label: 'Pair Summary',
        tabId: 1,
    };
    activeTabIndex = 0;

    maxDescLength: number = 70;
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    accountsDemo = [
        '0x1256fa67c70000986a6',
        '0x1356fa67c70000986a6',
        '0x1456fa67c70000986a6',
        '0x1556fa67c70000986a6',
    ]
    isLoading: boolean = false;
    selectedRow: IDataAdminCurrencyPair;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.timePickerTheme = darkTheme;
        this.getList();
    }

    getList() {
        this.isLoading = true;
        const { PageIndex, PageSize } = this.currencyPairData;
        this.platformService.getCurrencyPairs({
            PageIndex: PageIndex + 1,
            PageSize
        }).subscribe(res => {
            this.currencyPairData = {
                ...this.currencyPairData,
                data: res.missingCurrencyPairs,
                total: res.recordCount
            };
            this.isLoading = false;
        });
    }

    initForm() {
        this.filtersForm = this.fb.group({
            fromAccounts: [[]],
            status: [[]],
            providers: [[]],
            pairName: [''],
            baseToken: [''],
            quoteToken: [''],
            firstSelectBy: [''],
            firstDate: [null],
            firstTime: [''],
            lastSelectBy: [''],
            lastDate: [null],
            lastTime: [''],
            active: [true],
            requested: [true]
        })
    }

    onSearchButtonClick() {
        if (this.isSearchInputOpen) {
            this.searchQuery = '';
            // this.refreshReportList();
        }
        this.isSearchInputOpen = !this.isSearchInputOpen;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            // this.refreshReportList();
        } else if ($event.key === 'Escape') {
            this.isSearchInputOpen = false;
            this.searchQuery = '';
            // this.refreshReportList();
        }
    }

    setActiveTab(tabIndex: number) {
        this.activeTabIndex = tabIndex;
        this.selectedTab = this.currencyPairsTabs[tabIndex];
    }

    page(PageIndex: number, PageSize: number) {
    }

    clickedRow(row: IDataAdminCurrencyPair) {
        this.selectedRow = row;
    }
}
