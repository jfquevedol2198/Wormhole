import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AccountingService } from '../../../services/accounting/accounting.service';

@Component({
    selector: 'app-add-address-manually-dialog',
    templateUrl: './add-address-manually-dialog.component.html',
})
export class AddAddressManuallyDialogComponent {
    public accountForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<AddAddressManuallyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.accountForm = this.fb.group({
            ledgerAddress: ['', [Validators.required]],
            description: ['', []],
        });
    }

    onAddAddressClick() {
        if (this.accountForm.valid) {
            this.accountingService
                .modifyPortfolio({
                    portfolioId: this.data.portfolioId,
                    accountsToAdd: [
                        {
                            ledgerAddress: this.accountForm.value.ledgerAddress,
                            description: this.accountForm.value.description,
                            ledgerName: this.data.ledgerName,
                        },
                    ],
                })
                .subscribe((response) => {
                    if (
                        response.message ===
                        'Successfully updated existing portfolio'
                    ) {
                        this.dialogRef.close(true);
                    }
                });
        }
    }

    getErrorMessage() {
        if (this.accountForm.controls['ledgerAddress'].hasError('required')) {
            return 'Address is required';
        }
    }
}
