import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPairProcessingJobData, DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DismissProcessLogDialogComponent } from 'src/app/components/dismiss-process-log-dialog/dismiss-process-log-dialog.component';

@Component({
  selector: 'app-data-admin-currency-pairs-processing-jobs',
  templateUrl: './data-admin-currency-pairs-processing-jobs.component.html',
  styleUrls: ['./data-admin-currency-pairs-processing-jobs.component.css']
})
export class DataAdminCurrencyPairsProcessingJobsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    currencyPairProcessingJobData: CurrencyPairProcessingJobData = new CurrencyPairProcessingJobData();

    editMode: boolean = false

    columnsToDisplay = [
        'id',
        'name',
        'severity',
        'message',
        'startHeight',
        'endHeight',
        'note',
        'dismiss',
        'isSelected'
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    filtersForm: FormGroup;
    isFilterOpen: boolean = false;

    severities = [
        {
            value: 'information',
            label: 'Information'
        },
        {
            value: 'warning',
            label: 'Warning'
        },
        {
            value: 'error',
            label: 'Error'
        },
    ];
    names = [
        {
            value: 'suspecious_rate',
            label: 'Suspecious Rate'
        },
        {
            value: 'something_else',
            label: 'Something else'
        },
        {
            value: 'something_else_2',
            label: 'Something else 2'
        },
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
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.platformService.getCurrencyPairsProcessingJobs().subscribe((data: any) => {
            this.currencyPairProcessingJobData = {
                ...this.currencyPairProcessingJobData,
                data: data,
            };
        });
        this.initForm();
    }

    initForm() {
        this.filtersForm = this.fb.group({
            severity: [''],
            name: [''],
            selectBy: [''],
            startHeight: [''],
            endHeight: [''],
            dismissed: [true]
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

    onChangeDismiss(e: MatSlideToggleChange, row: any) {
        this.dialog.open(DismissProcessLogDialogComponent, {
            width: '498px',
            disableClose: true
        });
    }
}
