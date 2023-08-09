import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BarChartModule } from '../bar-chart/bar-chart.module';
import { NoDataCommunicateModule } from '../no-data-communicate/no-data-communicate.module';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
    declarations: [PieChartComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        BarChartModule,
        NoDataCommunicateModule,
    ],
    exports: [PieChartComponent],
})
export class PieChartModule {}
