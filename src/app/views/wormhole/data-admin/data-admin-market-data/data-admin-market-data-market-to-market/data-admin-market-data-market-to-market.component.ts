import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    DataAdminService,
    CurrencyPairMarketToMarketData,
} from 'src/app/services/data-admin/data-admin.service';
import { darkTheme } from '../../../../../constants/time-picker-theme';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
    selector: 'app-data-admin-market-data-market-to-market',
    templateUrl: './data-admin-market-data-market-to-market.component.html',
    styleUrls: ['./data-admin-market-data-market-to-market.component.css'],
})
export class DataAdminMarketDataMarketToMarketComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    currencyPairMarketToMarketData: CurrencyPairMarketToMarketData = new CurrencyPairMarketToMarketData();

    columnsToDisplay = [
        'pairName',
        'baseToken',
        'quoteToken',
        'fixedExchangeRate',
        'firstSeen',
        'lastSeen',
        'active',
        'requested',
    ];

    maxDescLength: number = 70;
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    isLoading: boolean = false;
    isFilterOpen: boolean = false;
    filtersForm: FormGroup;
    timePickerTheme: NgxMaterialTimepickerTheme;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.timePickerTheme = darkTheme;
        this.initForm();
        this.getList();
    }

    initForm() {
        this.filtersForm = this.fb.group({
            pairName: [''],
            baseToken: [''],
            quoteToken: [''],
            showBy: [''],
            firstSeenHeight: [''],
            endBy: [''],
            lastSeen: [''],
            endTime: ['']
        });
    }

    getList() {
        this.isLoading = true;
        const { PageIndex, PageSize } = this.currencyPairMarketToMarketData;
        this.platformService
            .getCurrencyPairsMarketToMarket({
                PageIndex,
                PageSize
            })
            .subscribe(data => {
                this.currencyPairMarketToMarketData = {
                    ...this.currencyPairMarketToMarketData,
                    data: data.marketToMarketExchangePairs,
                    total: data.recordCount
                };
                this.isLoading = false;
            });
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

    page(PageIndex: number, PageSize: number) {
    }
}
