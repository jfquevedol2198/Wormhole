import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-mode-alert-dialog',
    templateUrl: './edit-mode-alert-dialog.component.html',
})
export class EditModeAlertDialogComponent {
    constructor(public dialogRef: MatDialogRef<EditModeAlertDialogComponent>) {}

    onYesClick() {
        this.dialogRef.close(true);
    }
}
