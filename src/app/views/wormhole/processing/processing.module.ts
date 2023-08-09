import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ProcessingJobsModule } from './processing-jobs/processing-jobs.module';
import { ProcessingProfitAndLossModule } from './processing-profit-and-loss/processing-profit-and-loss.module';
import { ProcessingRoutesModule } from './processing-routing.module';
import { ProcessingComponent } from './processing.component';

@NgModule({
    declarations: [ProcessingComponent],
    imports: [
        CommonModule,
        ProcessingRoutesModule,
        ProcessingProfitAndLossModule,
        ProcessingJobsModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    exports: [ProcessingComponent],
})
export class ProcessingModule { }
