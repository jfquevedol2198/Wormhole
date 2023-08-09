import * as moment from 'moment';

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProcessingService } from '../../processing.service';

@Component({
    selector: 'app-add-profit-and-loss-dialog',
    templateUrl: './add-profit-and-loss-dialog.component.html',
    styleUrls: ['./add-profit-and-loss-dialog.component.scss'],
})
export class AddProfitAndLossDialogComponent {
    formGroup: FormGroup;

    public minDate: moment.Moment;
    public maxDate: moment.Moment;

    constructor(
        public dialogRef: MatDialogRef<AddProfitAndLossDialogComponent>,
        private readonly fb: FormBuilder,
        private processingService: ProcessingService,
        @Inject(MAT_DIALOG_DATA) public data,
    ) {
        this.formGroup = this.fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
        });
    }
    addPnLDefinition() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const startDate = this.formGroup.controls.startDate.value;
            const endDate = this.formGroup.controls.endDate.value;

            this.processingService
                .addProfitAndLossDefinition({
                    periodStartDate: moment(startDate).unix(),
                    periodEndDate: moment(endDate).unix(),
                    profitAndLossScheduleId: this.data.profitAndLossScheduleId,
                })
                .subscribe((data) => {
                    // TODO: update definitions list
                });
        }
    }
}
