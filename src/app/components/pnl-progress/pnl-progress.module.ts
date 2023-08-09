import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormatValuePipeModule } from '../../pipes/format-value/format-value.pipe.module';
import { HumanReadableTimePipeModule } from '../../pipes/human-readable-time/human-readable-time.pipe.module';

import { PnlProgressComponent } from './pnl-progress.component';

@NgModule({
    declarations: [PnlProgressComponent],
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        FormatValuePipeModule,
        HumanReadableTimePipeModule,
    ],
    exports: [PnlProgressComponent],
})
export class PnlProgressModule {}
