import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressLabelJobData, DataAdminService } from 'src/app/services/data-admin/data-admin.service';

@Component({
  selector: 'app-data-admin-address-labels-jobs',
  templateUrl: './data-admin-address-labels-jobs.component.html',
  styleUrls: ['./data-admin-address-labels-jobs.component.css']
})
export class DataAdminAddressLabelsJobsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    addressLabelJobData: AddressLabelJobData = new AddressLabelJobData();

    columnsToDisplay = [
        'id',
        'agent',
        'runCount',
        'sessionID',
        'scheduled',
        'started',
        'completed',
        'provider',
        'status',
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
        this.platformService.getAddressLabelsJobs().subscribe((data: any) => {
            this.addressLabelJobData = {
                ...this.addressLabelJobData,
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
