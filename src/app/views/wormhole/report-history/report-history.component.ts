import { BehaviorSubject, throwError } from 'rxjs';
import { timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IPreset } from 'src/app/interfaces/advancedSearch.interface';
import {
    IReportDefinitionExtended,
    IReportSuccessResponse,
} from 'src/app/interfaces/reportHistory.interface';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';
import { ReportHistoryService } from 'src/app/services/report-history/report-history.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AdvancedSearchDialogComponent } from '../../../components/advanced-search-dialog/advanced-search-dialog.component';
import { StatusMessageComponent } from '../../../components/status-message/status-message.component';
import { COLLAPSED_HEIGHT, SCHEDULE_OPTIONS } from './consts';

@Component({
    selector: 'app-report-history',
    templateUrl: './report-history.component.html',
    styleUrls: ['./report-history.component.scss'],
})
export class ReportHistoryComponent implements OnInit {
    @ViewChild(StatusMessageComponent) statusMessage: StatusMessageComponent;

    public reportForm: FormGroup;
    isCreatorOpen = true;

    reportDefinitions$: BehaviorSubject<IReportDefinitionExtended[]> =
        new BehaviorSubject([]);
    savedPresetsList$: BehaviorSubject<IPreset[]> = new BehaviorSubject([]);
    checkingReports$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    selectedPresetFromDialog;
    submitted = false;

    scheduleOptions = SCHEDULE_OPTIONS;
    collapsedHeight = COLLAPSED_HEIGHT;

    isSearchInputOpen = false;

    constructor(
        private readonly fb: FormBuilder,
        public advancedSearchService: AdvancedSearchService,
        public reportHistoryService: ReportHistoryService,
        private dialog: MatDialog,
    ) {
        this.reportForm = this.fb.group({
            reportPresetId: ['', Validators.required],
            name: ['', [Validators.required]],
            description: [''],
            schedule: [''],
            searchInput: [''],
        });
    }

    ngOnInit() {
        this.advancedSearchService
            .getReportPresets()
            .subscribe((reportPresetsFromResponse: IPreset[]) => {
                this.savedPresetsList$.next(reportPresetsFromResponse);
            });
        this.getReportsDefinition();

        timer(0, 10000).subscribe((data) => {
            if (this.checkingReports$.getValue()) {
                this.getReportsDefinition();
            }
        });
    }
    getReportsDefinition() {
        this.reportHistoryService
            .getReportDefinitionWithForm(this.fb)
            .subscribe(
                (reportsListFromResponse: IReportDefinitionExtended[]) => {
                    this.reportDefinitions$.next(reportsListFromResponse);
                    let found = false;
                    reportsListFromResponse.map((reportsList) => {
                        if (reportsList.reportDefinitionItems.length === 0) {
                            found = true;
                        }
                    });
                    this.checkingReports$.next(found);
                },
            );
    }
    openDialog() {
        const dialogRef = this.dialog.open(AdvancedSearchDialogComponent, {
            data: {
                isToBeSelected: true,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.submitted = false;
                this.selectedPresetFromDialog = result;
                this.reportForm.controls['reportPresetId'].setValue(
                    this.selectedPresetFromDialog.reportPresetId,
                );
            } else {
                this.submitted = true;
                this.reportForm.controls['reportPresetId'].setErrors({
                    required: true,
                });
            }
        });
    }

    updateReportDefinition(e: Event, report: IReportDefinitionExtended) {
        e.stopPropagation();
        this.reportHistoryService
            .modifyReportDefinition(report, this.fb)
            .pipe(
                catchError((error) => {
                    this.statusMessage.showMessage({
                        status: 'error',
                        messageText: `Report "${report.name}" wasn't modified`,
                    });
                    return throwError(error);
                }),
            )
            .subscribe(
                (reportsListFromResponse: IReportDefinitionExtended[]) => {
                    this.statusMessage.showMessage({
                        status: 'successful',
                        messageText: `Report "${report.name}" was successfully modified`,
                    });
                    this.reportDefinitions$.next(reportsListFromResponse);
                },
            );

        report.isEdited = false;
    }

    stopEventPropagation(e: MouseEvent) {
        e.stopPropagation();
    }

    toggleUpdating(e: Event, i: number) {
        const list = this.reportDefinitions$.getValue();
        list.map((item, index) => {
            return (item.isEdited = i === index ? !item.isEdited : false);
        });
        this.reportDefinitions$.next(list);
        e.stopPropagation();
    }

    deleteReportDefinition(e: Event, report: IReportDefinitionExtended) {
        e.stopPropagation();
        this.reportHistoryService
            .removeReportDefinition(report.reportDefinitionId)
            .pipe(
                switchMap((data: IReportSuccessResponse) => {
                    return this.reportHistoryService.getReportDefinitionWithForm(
                        this.fb,
                    );
                }),
                catchError((error) => {
                    this.statusMessage.showMessage({
                        status: 'error',
                        messageText: `Report "${report.name}" wasn't modified`,
                    });
                    return throwError(error);
                }),
            )
            .subscribe(
                (reportsListFromResponse: IReportDefinitionExtended[]) => {
                    this.statusMessage.showMessage({
                        status: 'successful',
                        messageText: `Report "${report.name}" was successfully removed`,
                    });
                    this.reportDefinitions$.next(reportsListFromResponse);
                },
            );
    }

    toggleNewReportCreator() {
        this.isCreatorOpen = !this.isCreatorOpen;
    }

    createNewReport() {
        this.submitted = true;
        if (this.reportForm.valid) {
            this.reportHistoryService
                .getReportsAfterAdding(this.reportForm.value, this.fb)
                .pipe(
                    catchError((error) => {
                        this.statusMessage.showMessage({
                            status: 'error',
                            messageText: `Report "${this.reportForm.controls.name.value}" wasn't created`,
                        });
                        return throwError(error);
                    }),
                )
                .subscribe(
                    (reportsListFromResponse: IReportDefinitionExtended[]) => {
                        this.statusMessage.showMessage({
                            status: 'successful',
                            messageText: `Report "${this.reportForm.controls.name.value}" was successfully created`,
                        });
                        this.reportDefinitions$.next(reportsListFromResponse);
                        this.reportForm.reset();
                    },
                );

            this.submitted = false;
        }
    }

    onSearchButtonClick() {
        this.isSearchInputOpen = true;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.onSearch();
        } else if ($event.key === 'Escape') {
            this.onCloseSearchClick();
        }
    }

    refreshReportList() {
        this.reportHistoryService
            .getReportDefinitionWithForm(
                this.fb,
                this.reportForm.controls.searchInput.value,
            )
            .subscribe(
                (reportsListFromResponse: IReportDefinitionExtended[]) => {
                    this.reportDefinitions$.next(reportsListFromResponse);
                },
            );
    }

    onSearch() {
        this.refreshReportList();
    }

    onCloseSearchClick() {
        this.reportForm.controls.searchInput.setValue('');
        this.isSearchInputOpen = false;
        this.refreshReportList();
    }
}
