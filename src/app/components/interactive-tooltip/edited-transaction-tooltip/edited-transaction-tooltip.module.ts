import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppTooltipModule } from '../../app-tooltip/app-tooltip.module';
import { PaginatorModule } from '../../paginator/paginator.module';
import { EditedTransactionTooltipComponent } from './edited-transaction-tooltip.component';

@NgModule({
    declarations: [EditedTransactionTooltipComponent],
    imports: [
        CommonModule,
        AppTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ClipboardModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTooltipModule,
        PaginatorModule,
    ],
    exports: [EditedTransactionTooltipComponent],
})
export class EditedTransactionTooltipModule {}
