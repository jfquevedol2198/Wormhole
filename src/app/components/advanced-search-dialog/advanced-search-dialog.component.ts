import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
    IAdvancedSearchParams,
    IPersistence,
    IPreset,
    IPresetDefinition,
} from 'src/app/interfaces/advancedSearch.interface';
import { AccountingService } from 'src/app/services/accounting/accounting.service';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';
import { getFormattedPresetToUpdate } from 'src/app/services/advanced-search/helperFunctions';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { StatusMessageComponent } from '../status-message/status-message.component';

@Component({
    selector: 'app-advanced-search-dialog',
    templateUrl: './advanced-search-dialog.component.html',
    styleUrls: ['./advanced-search-dialog.component.scss'],
})
export class AdvancedSearchDialogComponent implements OnInit {
    @ViewChild(StatusMessageComponent) statusMessage: StatusMessageComponent;
    public form: FormGroup;
    presetToUpdate;
    lastPresetIdFromList: number;
    formattedPreset: Subscription;
    submitted: boolean;

    savedPresetsList$: BehaviorSubject<IPreset[]> = new BehaviorSubject([]);
    recentPresetsList$: BehaviorSubject<IPreset[]> = new BehaviorSubject([]);

    transience: IPersistence = 'Transient';
    platforms: string[] = [];

    constructor(
        public advancedSearchService: AdvancedSearchService,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: IAdvancedSearchParams,
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        private router: Router,
    ) {
        dialogRef.disableClose = true;
        this.form = this.fb.group({
            presetName: ['', [Validators.required]],
            startBy: ['', []],
            endBy: ['', []],
            blockStartHeight: ['', []],
            blockEndHeight: ['', []],
            fromDate: ['', []],
            toDate: ['', []],
            source: ['', []],
            platform: ['', []],
            fromValue: ['', []],
            toValue: ['', []],
            currency: ['', []],
            isEdited: ['', []],
            isDisabled: ['', []],
            asset: ['', []],
            isError: ['', []],
            methodId: ['', []],
            methodDescription: ['', []],
            methodProcessing: ['', []],
        });
    }

    ngOnInit() {
        this.dialogRef.keydownEvents().subscribe((event) => {
            if (event.key === 'Escape') {
                this.onCancel();
            }
        });
        this.advancedSearchService
            .getReportPresets()
            .subscribe((presetsListFromReponse: IPreset[]) => {
                this.savedPresetsList$.next(presetsListFromReponse);
            });

        this.advancedSearchService
            .getReportPresets(this.transience)
            .subscribe((presetsListFromReponse: IPreset[]) => {
                this.recentPresetsList$.next(presetsListFromReponse);
            });

        this.advancedSearchService.getPlatforms().subscribe((response) => {
            this.platforms = response
                .map((item) => {
                    return item.name;
                })
                .sort();
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    searchPreset(close = true, persistence: IPersistence = 'Transient') {
        this.submitted = true;

        if (this.form.valid) {
            if (close === false) {
                this.statusMessage.showMessage({
                    status: 'successful',
                    messageText: `Preset "${this.form.controls.presetName.value}" was successfully created`,
                });
            }

            this.formattedPreset = this.advancedSearchService
                .getProperPresetFormatWithoutEmptyValues(this.form.value)
                .pipe(
                    switchMap((data) => this.processFromDate(data)),
                    switchMap((data) => this.processToDate(data)),
                    switchMap((data) =>
                        this.advancedSearchService.addReportPreset(
                            data,
                            persistence,
                        ),
                    ),
                    tap((response) => {
                        this.lastPresetIdFromList = response.id;
                    }),
                    switchMap(() =>
                        this.advancedSearchService.getReportPresets(
                            persistence,
                        ),
                    ),
                )
                .subscribe((presetsListFromResponse) => {
                    if (persistence === 'Transient') {
                        this.recentPresetsList$.next(presetsListFromResponse);
                    } else {
                        this.savedPresetsList$.next(presetsListFromResponse);
                    }
                    if (close) {
                        this.router.navigate([], {
                            queryParams: {
                                reportPresetId: this.lastPresetIdFromList,
                            },
                            queryParamsHandling: 'merge',
                        });
                        this.dialogRef.close();
                    }
                });
        }
    }

    savePresetAndSearch() {
        this.searchPreset(true, 'Persistent');
    }

    findPresetByIndex(presetId: number, persistence: IPersistence) {
        if (persistence === 'Transient') {
            return this.recentPresetsList$.getValue().find((preset) => {
                return preset.reportPresetId === presetId;
            });
        }
        return this.savedPresetsList$.getValue().find((preset) => {
            return preset.reportPresetId === presetId;
        });
    }

    removePreset(preset: IPreset) {
        const passedId = preset.reportPresetId;
        const persistence = preset.persistence;

        this.statusMessage.showMessage({
            status: 'successful',
            messageText: `Preset "${preset.name}" was successfully deleted`,
        });
        this.advancedSearchService
            .removeReportPreset(passedId)
            .pipe(
                switchMap(() =>
                    this.advancedSearchService.getReportPresets(persistence),
                ),
            )
            .subscribe((presetsListFromReponse) => {
                if (persistence === 'Transient') {
                    this.recentPresetsList$.next(presetsListFromReponse);
                } else {
                    this.savedPresetsList$.next(presetsListFromReponse);
                }
            });
    }

    getActivePreset(preset: IPreset) {
        const persistence = preset.persistence;
        const presetId = preset.reportPresetId;
        const list = this.savedPresetsList$.getValue();
        const oppositeList = this.recentPresetsList$.getValue();

        list.map((item) => {
            return (item.isActive = item.reportPresetId === presetId);
        });

        if (persistence === 'Transient') {
            this.recentPresetsList$.next(list);
            oppositeList.map((item) => (item.isActive = false));
            this.savedPresetsList$.next(oppositeList);
        } else {
            this.savedPresetsList$.next(list);
            oppositeList.map((item) => (item.isActive = false));
            this.recentPresetsList$.next(oppositeList);
        }
    }

    updatePreset(preset: IPreset) {
        const passedId = preset.reportPresetId;
        const persistence = preset.persistence;
        this.form.reset();

        const foundedPresetByIndex = this.findPresetByIndex(
            passedId,
            persistence,
        );
        this.presetToUpdate =
            this.advancedSearchService.getPresetToUpdate(foundedPresetByIndex);
        this.getActivePreset(preset);
        this.form.patchValue(this.presetToUpdate.definition);
    }

    update() {
        this.submitted = true;
        if (this.form.valid) {
            this.statusMessage.showMessage({
                status: 'successful',
                messageText: `Preset "${this.form.controls.presetName.value}" was successfully updated`,
            });

            const persistence = this.presetToUpdate.persistence;
            this.formattedPreset = getFormattedPresetToUpdate(
                this.presetToUpdate,
                this.form.value,
            )
                .pipe(
                    switchMap((data) => {
                        return this.advancedSearchService.modifyReportPreset(
                            data,
                        );
                    }),
                    switchMap(() =>
                        this.advancedSearchService.getReportPresets(
                            persistence,
                        ),
                    ),
                )
                .subscribe((presetsListFromReponse) => {
                    if (persistence === 'Transient') {
                        this.recentPresetsList$.next(presetsListFromReponse);
                    } else {
                        this.savedPresetsList$.next(presetsListFromReponse);
                    }
                });
        }
    }

    select() {
        this.dialogRef.close(this.presetToUpdate);
    }

    reset() {
        this.submitted = false;
        this.form.reset();
    }

    cancel() {
        this.submitted = false;
        this.form.reset();
        this.dialogRef.close();
    }

    private processFromDate(data: IPresetDefinition) {
        if (data.fromDate) {
            return this.accountingService.getBlockNumber(data.fromDate).pipe(
                map((blockNumber) => {
                    data.startBlock = blockNumber;
                    delete data['fromDate'];
                    return data;
                }),
            );
        }

        return of(data);
    }

    private processToDate(data: IPresetDefinition) {
        if (data.toDate) {
            return this.accountingService.getBlockNumber(data.toDate).pipe(
                map((blockNumber) => {
                    data.endBlock = blockNumber;
                    delete data['toDate'];
                    return data;
                }),
            );
        }

        return of(data);
    }
}
