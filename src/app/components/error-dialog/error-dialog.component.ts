import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IErrorMessageData } from '../../interfaces/errorMessageData.interface';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: IErrorMessageData) {}
}
