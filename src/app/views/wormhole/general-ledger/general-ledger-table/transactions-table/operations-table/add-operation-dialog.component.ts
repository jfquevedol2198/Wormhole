import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IOperationFlag } from '../../../../../../interfaces/operation.interface';
import { ITransaction } from '../../../../../../interfaces/transaction.interface';
import { AccountingService } from '../../../../../../services/accounting/accounting.service';
import { getOperationDataFromForm } from '../../../../../../utilities/getOperationDataFromForm';
import { supportedLedges, flags } from './operation-helpers';

@Component({
    selector: 'app-add-operation-dialog',
    templateUrl: './add-operation-dialog.component.html',
})
export class AddOperationDialogComponent {
    public operationForm: FormGroup;

    flags: IOperationFlag[] = flags;
    supportedLedgers: string[] = supportedLedges;

    constructor(
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<AddOperationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public transaction: ITransaction,
    ) {
        this.operationForm = this.fb.group({
            fromAddress: ['', [Validators.required]],
            toAddress: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            ledgerName: ['', [Validators.required]],
            assetAddress: ['', [Validators.required]],
            tokenId: ['', []],
            flags: ['', []],
        });
    }

    onAddOperationClick() {
        if (this.operationForm.valid) {
            this.accountingService
                .addOperation({
                    ...getOperationDataFromForm(this.operationForm.value),
                    transactionId: this.transaction.transactionId,
                })
                .subscribe((response) => {
                    if (response.id) {
                        this.dialogRef.close(true);
                    }
                });
        }
    }
}
