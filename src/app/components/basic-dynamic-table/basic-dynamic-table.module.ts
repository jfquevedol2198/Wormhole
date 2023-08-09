import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PaginatorModule } from '../paginator/paginator.module';
import { TableHeaderModule } from '../table-header/table-header.module';
import { BasicDynamicTableComponent } from './basic-dynamic-table.component';

@NgModule({
    declarations: [BasicDynamicTableComponent],
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        CommonModule,
        MatTooltipModule,
        PaginatorModule,
        TableHeaderModule,
    ],
    exports: [BasicDynamicTableComponent],
})
export class BasicDynamicTableModule {}
