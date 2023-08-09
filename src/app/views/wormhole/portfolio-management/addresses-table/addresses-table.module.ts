import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProgressTooltipModule } from '../../../../components/interactive-tooltip/progress-tooltip/progress-tooltip.module';
import { AddressesTableComponent } from './addresses-table.component';
import { ImportTransactionsDialogComponent } from './import-transactions-dialog.component';

@NgModule({
    declarations: [AddressesTableComponent, ImportTransactionsDialogComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatMenuModule,
        MatDialogModule,
        ProgressTooltipModule,
        MatProgressBarModule,
    ],
    exports: [AddressesTableComponent],
})
export class AddressesTableModule {}
