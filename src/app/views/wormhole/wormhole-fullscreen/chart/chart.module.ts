import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { LineChartModule } from '../../../../components/line-chart/line-chart.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ChartComponent } from './chart.component';

@NgModule({
    declarations: [ChartComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ChartComponent,
            },
        ]),
        HttpClientModule,
        MatProgressSpinnerModule,
        LineChartModule,
    ],
    providers: [AccountingService, ApiService],
})
export class ChartModule {}
