import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AccountingService } from '../../../services/accounting/accounting.service';

@Component({
    selector: 'app-modify-portfolio-dialog',
    templateUrl: './modify-portfolio-dialog.component.html',
})
export class ModifyPortfolioDialogComponent {
    public portfolioForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<ModifyPortfolioDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.portfolioForm = this.fb.group({
            name: [data.name, [Validators.required]],
            description: [data.description, []],
        });
    }

    onModifyClick() {
        if (this.portfolioForm.valid) {
            this.accountingService
                .modifyPortfolio({
                    portfolioId: this.data.portfolioId,
                    name: this.portfolioForm.value.name,
                    description: this.portfolioForm.value.description,
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
}
