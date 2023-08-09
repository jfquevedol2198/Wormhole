import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ErrorMessageService } from '../../services/error-message/error-message.service';
import { ErrorDialogComponent } from './error-dialog.component';

@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [ErrorDialogComponent],
    providers: [ErrorMessageService],
    entryComponents: [ErrorDialogComponent],
})
export class ErrorDialogModule {}
