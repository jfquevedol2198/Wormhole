import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-alert-dialog-dialog',
    templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent {
    constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {}
}
