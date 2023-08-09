import { saveAs } from 'file-saver';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BlockchainService } from '../../../../services/blockchain/blockchain.service';

@Component({
    selector: 'app-import-transactions-dialog',
    templateUrl: './import-transactions-dialog.component.html',
    styleUrls: ['import-transactions-dialog.component.scss'],
})
export class ImportTransactionsDialogComponent {
    transactionsFile: File;

    constructor(
        public dialogRef: MatDialogRef<ImportTransactionsDialogComponent>,
        private blockchainService: BlockchainService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    onImportClick() {
        if (this.transactionsFile) {
            let formData: FormData = new FormData();
            formData.append(
                'File',
                this.transactionsFile,
                this.transactionsFile.name,
            );
            this.blockchainService
                .importTransactions(this.data.ledgerName, formData)
                .subscribe((data) => {
                    if (data) {
                        this.dialogRef.close(true);
                    }
                });
        }
    }

    downloadFileTemplate() {
        this.blockchainService
            .getTransactionImportTemplate(this.data.ledgerName)
            .subscribe((response) => {
                saveAs(response, 'template.csv');
            });
    }

    onSelectFileClick(event) {
        this.transactionsFile = event.target.files[0];
    }
}
