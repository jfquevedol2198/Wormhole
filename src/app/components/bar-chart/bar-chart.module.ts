import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BarChartComponent } from './bar-chart.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StackedRowModule } from '../stacked-row/stacked-row.module';

@NgModule({
    declarations: [BarChartComponent],
    imports: [CommonModule, RouterModule, MatTooltipModule, StackedRowModule],
    exports: [BarChartComponent],
})
export class BarChartModule {}
