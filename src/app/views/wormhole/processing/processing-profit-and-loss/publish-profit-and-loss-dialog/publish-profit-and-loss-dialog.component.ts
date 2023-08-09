import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProcessingService } from '../../processing.service';

@Component({
    selector: 'publish-add-profit-and-loss-dialog',
    templateUrl: './publish-profit-and-loss-dialog.component.html',
})
export class PublishProfitAndLossDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<PublishProfitAndLossDialogComponent>,

        private processingService: ProcessingService,
        @Inject(MAT_DIALOG_DATA) public data,
    ) {}
    publish() {
        this.processingService
            .modifyProfitAndLossDefinition({
                profitAndLossDefinitionId: this.data.profitAndLossDefinitionId,
                published: true,
            })
            .subscribe((data) => {
                this.dialogRef.close();
            });
    }
}
