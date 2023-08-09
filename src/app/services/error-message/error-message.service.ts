import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Injectable()
export class ErrorMessageService {
    private isOpened = false;

    constructor(private dialog: MatDialog) {}

    showErrorMessage(errorMessage: string = 'Unknown error'): void {
        if (!this.isOpened) {
            this.isOpened = true;
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
                data: { message: errorMessage },
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: true,
                hasBackdrop: true,
            });

            dialogRef.afterClosed().subscribe(() => {
                this.isOpened = false;
            });
        }
    }
}
