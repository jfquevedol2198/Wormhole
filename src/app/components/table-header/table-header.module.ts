import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortArrowModule } from './sort-arrow/sort-arrow.module';
import { TableHeaderComponent } from './table-header.component';

@NgModule({
    declarations: [TableHeaderComponent],
    imports: [CommonModule, SortArrowModule],
    exports: [TableHeaderComponent],
})
export class TableHeaderModule {}
