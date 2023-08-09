import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TableHeaderModule } from '../../../../../components/table-header/table-header.module';
import { InventoryPerformanceTableComponent } from './inventory-performance-table.component';

@NgModule({
    declarations: [InventoryPerformanceTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        TableHeaderModule,
        MatTooltipModule,
    ],
    exports: [InventoryPerformanceTableComponent],
})
export class InventoryPerformanceTableModule {}
