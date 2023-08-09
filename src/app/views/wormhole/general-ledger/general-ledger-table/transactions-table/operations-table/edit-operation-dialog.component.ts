import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
    IOperation,
    IOperationFlag,
} from '../../../../../../interfaces/operation.interface';
import { AccountingService } from '../../../../../../services/accounting/accounting.service';
import { getOperationDataFromForm } from '../../../../../../utilities/getOperationDataFromForm';
import { getOperationFlags } from '../../../../../../utilities/getOperationFlags';
import { supportedLedges, flags } from './operation-helpers';

@Component({
    selector: 'app-edit-operation-dialog',
    templateUrl: './edit-operation-dialog.component.html',
})
export class EditOperationDialogComponent {
    public operationForm: FormGroup;

    flags: IOperationFlag[] = flags;
    supportedLedges: string[] = supportedLedges;

    constructor(
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<EditOperationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public operation: IOperation,
    ) {
        this.operationForm = this.fb.group({
            fromAddress: [operation.fromAddress, [Validators.required]],
            toAddress: [operation.toAddress, [Validators.required]],
            amount: [operation.value, [Validators.required]],
            flags: [getOperationFlags(operation), []],
            assetAddress: [operation.assetAddress, [Validators.required]],
            tokenId: [operation.assetTokenId, []],
            ledgerName: [operation.ledgerName, [Validators.required]],
        });
    }

    onSaveOperationClick() {
        if (this.operationForm.valid) {
            this.accountingService
                .modifyOperation({
                    ...getOperationDataFromForm(this.operationForm.value),
                    operationId: this.operation.operationId,
                })
                .subscribe((response) => {
                    if (
                        response.message === 'Successfully modified operation'
                    ) {
                        this.dialogRef.close(true);
                    }
                });
        }
    }
}
