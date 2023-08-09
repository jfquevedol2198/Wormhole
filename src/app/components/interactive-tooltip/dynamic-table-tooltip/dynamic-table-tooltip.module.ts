import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AppTooltipModule } from '../../app-tooltip/app-tooltip.module';
import { DynamicTableTooltipComponent } from './dynamic-table-tooltip.component';

@NgModule({
    declarations: [DynamicTableTooltipComponent],
    imports: [
        CommonModule,
        AppTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ClipboardModule,
    ],
    exports: [DynamicTableTooltipComponent],
})
export class DynamicTableTooltipModule {}
