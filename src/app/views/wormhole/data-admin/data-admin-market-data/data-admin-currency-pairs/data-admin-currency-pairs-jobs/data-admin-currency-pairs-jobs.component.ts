import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAdminService, CurrencyPairJobData } from 'src/app/services/data-admin/data-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-admin-currency-pairs-jobs',
  templateUrl: './data-admin-currency-pairs-jobs.component.html',
  styleUrls: ['./data-admin-currency-pairs-jobs.component.css']
})
export class DataAdminCurrencyPairsJobsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    currencyPairJobData: CurrencyPairJobData = new CurrencyPairJobData();

    editMode: boolean = false

    columnsToDisplay = [
        'id',
        'column1',
        'column2',
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

    isFilterOpen: boolean = false;
    filtersForm: FormGroup;

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    names = [
        {
            value: 'scheduled',
            label: 'Scheduled'
        },
        {
            value: 'running',
            label: 'Running'
        },
        {
            value: 'completed',
            label: 'Completed'
        },
        {
            value: 'failed',
            label: 'Failed'
        },
        {
            value: 'aborted',
            label: 'Aborted'
        },
        {
            value: 'terminated',
            label: 'Terminated'
        }
    ];
    holes = [
        {
            value: 'black_hole',
            label: 'Blackhole'
        },
        {
            value: 'red_hole',
            label: 'Redhole'
        },
        {
            value: 'green_hole',
            label: 'Greenhole'
        }
    ];
    status = [
        {
            value: 'active',
            label: 'Active'
        },
        {
            value: 'disabled',
            label: 'Disabled'
        }
    ];
    selectBys = [
        {
            value: 'block',
            label: 'Block'
        },
        {
            value: 'block_1',
            label: 'Block 1'
        }
    ];

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.platformService.getCurrencyPairsJobs().subscribe((data: any) => {
            this.currencyPairJobData = {
                ...this.currencyPairJobData,
                data: data,
            };
        });
        this.initForm();
    }

    initForm() {
        this.filtersForm = this.fb.group({
            names: [[]],
            holes: [[]],
            selectBy: [''],
            startHeight: [''],
            endHeight: [''],
            status: [''],
            sessionID: [''],
            workerTaskId: [''],
            reReunCount: ['']
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

    page(pageIndex: number, pageSize: number) {
        
    }
}
