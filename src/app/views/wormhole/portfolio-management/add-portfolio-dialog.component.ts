import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AccountingService } from '../../../services/accounting/accounting.service';

@Component({
    selector: 'app-add-portfolio-dialog',
    templateUrl: './add-portfolio-dialog.component.html',
})
export class AddPortfolioDialogComponent {
    public portfolioForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<AddPortfolioDialogComponent>,
    ) {
        this.portfolioForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', []],
        });
    }

    onAddPortfolioClick() {
        if (this.portfolioForm.valid) {
            this.accountingService
                .addPortfolio({
                    name: this.portfolioForm.value.name,
                    description: this.portfolioForm.value.description,
                })
                .subscribe((response) => {
                    if (response.id) {
                        this.dialogRef.close(true);
                    }
                });
        }
    }
}
