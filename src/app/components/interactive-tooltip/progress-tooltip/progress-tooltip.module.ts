import { MomentDatePipeModule } from 'src/app/pipes/moment-date/moment-date.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppTooltipModule } from '../../app-tooltip/app-tooltip.module';
import { ProgressTooltipComponent } from './progress-tooltip.component';

@NgModule({
    declarations: [ProgressTooltipComponent],
    imports: [CommonModule, AppTooltipModule, MomentDatePipeModule],
    exports: [ProgressTooltipComponent],
})
export class ProgressTooltipModule {}
