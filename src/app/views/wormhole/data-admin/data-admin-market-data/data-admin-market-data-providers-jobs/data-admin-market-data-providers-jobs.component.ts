import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderJobData, DataAdminService } from 'src/app/services/data-admin/data-admin.service';

@Component({
  selector: 'app-data-admin-market-data-providers-jobs',
  templateUrl: './data-admin-market-data-providers-jobs.component.html',
  styleUrls: ['./data-admin-market-data-providers-jobs.component.css']
})
export class DataAdminMarketDataProvidersJobsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    providerJobData: ProviderJobData = new ProviderJobData();

    columnsToDisplay = [
        'id',
        'agent',
        'runCount',
        'sessionID',
        'scheduled',
        'started',
        'completed',
        'provider',
        'active',
        'isSelected',
        'action'
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService
    ) {}

    ngOnInit(): void {
        this.platformService.getProvidersJobs().subscribe((data: any) => {
            this.providerJobData = {
                ...this.providerJobData,
                data: data,
            };
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
