import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { DynamicTableModule } from '../../../../../components/dynamic-table/dynamic-table.module';
import { NoDataCommunicateModule } from '../../../../../components/no-data-communicate/no-data-communicate.module';
import { PaginatorModule } from '../../../../../components/paginator/paginator.module';
import { TableHeaderModule } from '../../../../../components/table-header/table-header.module';
import { DeFiImpactTableComponent } from './de-fi-impact-table.component';
import { TokenMetricsTableModule } from './token-metrics-table/token-metrics-table.module';

@NgModule({
    declarations: [DeFiImpactTableComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        DynamicTableModule,
        NoDataCommunicateModule,
        PaginatorModule,
        MatTableModule,
        TableHeaderModule,
        MatIconModule,
        TokenMetricsTableModule,
    ],
    exports: [DeFiImpactTableComponent],
})
export class DeFiImpactTableModule {}
