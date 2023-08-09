import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { PnlProgressModule } from '../pnl-progress/pnl-progress.module';
import { PnlProgressDialogComponent } from './pnl-progress-dialog.component';

@NgModule({
    declarations: [PnlProgressDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        PnlProgressModule,
    ],
    exports: [PnlProgressDialogComponent],
})
export class PnlProgressDialogModule {}
