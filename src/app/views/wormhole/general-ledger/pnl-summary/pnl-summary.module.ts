import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatValuePipeModule } from '../../../../pipes/format-value/format-value.pipe.module';

import { PnlSummaryComponent } from './pnl-summary.component';

@NgModule({
    declarations: [PnlSummaryComponent],
    imports: [CommonModule, FormatValuePipeModule],
    exports: [PnlSummaryComponent],
})
export class PnlSummaryModule {}
