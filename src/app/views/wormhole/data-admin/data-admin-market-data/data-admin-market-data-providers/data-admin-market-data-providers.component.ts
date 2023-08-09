import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAdminService, ProviderData } from 'src/app/services/data-admin/data-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CoinGekoErrorDialogComponent } from '../../../../../components/coin-geko-error-dialog/coin-geko-error-dialog.component';

@Component({
  selector: 'app-data-admin-market-data-providers',
  templateUrl: './data-admin-market-data-providers.component.html',
  styleUrls: ['./data-admin-market-data-providers.component.scss']
})
export class DataAdminMarketDataProvidersComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    providerData: ProviderData = new ProviderData();
    filtersForm: FormGroup;

    columnsToDisplay = [
        'provider',
        'pairCount',
        'parameters',
        'action'
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    isFilterOpen: boolean = false;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.platformService.getProviders().subscribe((data: any) => {
            this.providerData = {
                ...this.providerData,
                data: data,
            };
        });
        this.initForm();
        // this.dialog.open(CoinGekoErrorDialogComponent, {
        //     width: '1234px',
        //     disableClose: true
        // });
    }

    initForm() {
        this.filtersForm = this.fb.group({
            providers: [[]],
            parameters: ['']
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

    page(pageIndex: number, pageSize: number) {
        
    }
}
