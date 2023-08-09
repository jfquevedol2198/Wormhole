import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAdminService, AddressLabelData } from 'src/app/services/data-admin/data-admin.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { CURRENCY_TYPE } from '../../../../constants/currency-type';
import { darkTheme } from '../../../../constants/time-picker-theme';
import { MatDialog } from '@angular/material/dialog';
import { ImportAddressDialogComponent } from '../../../../components/import-address-dialog/import-address-dialog.component'
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import {
    IDataAdminAddressLabelData,
    IDataAdminAddressLabel,
    IDataAdminAddressLabelResponse,
} from 'src/app/interfaces/dataadminAddressLabels.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IDataAdminPlatform } from 'src/app/interfaces/dataadminPlatforms.interface';

@Component({
  selector: 'app-data-admin-address-labels',
  templateUrl: './data-admin-address-labels.component.html',
  styleUrls: ['./data-admin-address-labels.component.scss']
})
export class DataAdminAddressLabelsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    addressLabelData: AddressLabelData = new AddressLabelData();
    timePickerTheme: NgxMaterialTimepickerTheme;

    columnsToDisplay = [
        'platformIcon',
        'platformName',
        'address',
        'tokenId',
        'displayName',
        'name',
        'symbol',
        'decimal',
        'scope',
        'scam',
        'chain',
        'type',
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    isFilterOpen: boolean = false;
    filtersForm: FormGroup;
    currencyType = [];
    accountsDemo = [
        '0x1256fa67c70000986a6',
        '0x1356fa67c70000986a6',
        '0x1456fa67c70000986a6',
        '0x1556fa67c70000986a6',
    ];
    decimals = Array.from({length: 19}, (_, i) => i);
    isLoading: boolean = true;
    selectedAddressType: string[] = [];
    selectedChain: string = '';
    supportedLedgers: string[] = [];
    platforms: IDataAdminPlatform[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.initFilterForm();
        this.currencyType = CURRENCY_TYPE;
        this.timePickerTheme = darkTheme;
        this.getList();
        this.platformService.getSupportedLedgers().subscribe(res => {
            this.supportedLedgers = res.records;
        });
        this.platformService.getPlatform({}).subscribe(res => {
            this.platforms = res.records;
        });
    }

    getList() {
        const { PageIndex, PageSize } = this.addressLabelData;
        this.isLoading = true;
        const { address, decimals, platform, text } = this.filtersForm.value;
        this.platformService.getAddressLabels({
            name: this.searchQuery,
            PageIndex: PageIndex + 1,
            PageSize,
            GetRecordCount: true,
            PlatformName: (platform || ''),
            Address: (address || '').trim(),
            AssetDecimals: decimals,
            AssetName: text,
            AssetSymbol: text
        }).subscribe((data: IDataAdminAddressLabelResponse) => {
            this.addressLabelData = {
                ...this.addressLabelData,
                data: data.records,
                total: data.recordCount
            };
            this.isLoading = false;
        });
    }

    initFilterForm() {
        this.filtersForm = this.fb.group({
            fromAccounts: [[]],
            toAccounts: [[]],
            selectby: ['date'],
            date: [''],
            time: [''],
            unknown: [true],
            platform: [''],
            address: [''],
            chains: [[]],
            types: [[]],
            rewardsTokens: [[]],
            text: [''],
            decimals: ['']
        })
    }

    resetData() {
        this.addressLabelData = {
            ...this.addressLabelData,
            PageIndex: 0,
            total: 0
        }
    }

    handleReset() {
        this.initFilterForm();
        this.resetData();
        this.getList();
    }

    onSearchButtonClick() {
        if (this.isSearchInputOpen) {
            this.searchQuery = '';
            this.resetData();
            this.getList();
        }
        this.isSearchInputOpen = !this.isSearchInputOpen;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.resetData();
            this.getList();
        } else if ($event.key === 'Escape') {
            this.isSearchInputOpen = false;
            this.searchQuery = '';
            this.resetData();
            this.getList();
        }
    }

    handleFilter() {
        this.resetData();
        this.getList();
    }

    page(PageIndex: number, PageSize: number) {
        this.addressLabelData = {
            ...this.addressLabelData,
            PageIndex,
            PageSize
        };
        this.getList();
    }

    onImportAddress() {
        this.dialog.open(ImportAddressDialogComponent, {
            disableClose: true,
            width: '1234px',
            data: {
                platforms: this.platforms,
                currencyType: this.currencyType.map(c => c.label)
            }
        })
    }

    handleUpdateLogo(row: IDataAdminAddressLabelData) {

    }

    handleChangeScam(e: MatSlideToggleChange, data: IDataAdminAddressLabel) {
        this.platformService.updateAddressLabel({
            ...data,
            scam: e.checked
        }).subscribe(data => {
            console.log('data', data);
        }, _ => {
            e.source.checked = !e.checked;
        });
    }

    handleOpenTypeMenu(row: IDataAdminAddressLabel) {
        this.selectedAddressType = row.addressType.trim().split(',').map(t => t.trim());
    }

    handleCloseMenu(row: IDataAdminAddressLabel) {
        const addressType = this.selectedAddressType.join(', ');
        if (row.addressType !== addressType) {
            this.platformService.updateAddressLabel({
                ...row,
                addressType
            }).subscribe(_ => {
                const { data } = this.addressLabelData;
                const index = data.findIndex(d => d.addressLabelId === row.addressLabelId);
                if (index > -1) {
                    data[index].addressType = addressType;
                    this.addressLabelData = {
                        ...this.addressLabelData,
                        data
                    };
                }
            });
        }
    }

    handleCloseChainMenu(row: IDataAdminAddressLabel) {
        if (this.selectedChain[0]) {
            const ledgerName = this.selectedChain[0];
            this.platformService.updateAddressLabel({
                ...row,
                ledgerName
            }).subscribe(_ => {
                const { data } = this.addressLabelData;
                const index = data.findIndex(d => d.addressLabelId === row.addressLabelId);
                if (index > -1) {
                    data[index].ledgerName = ledgerName;
                    this.addressLabelData = {
                        ...this.addressLabelData,
                        data
                    };
                }
            });
        }
    }
}
