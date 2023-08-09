import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortArrowComponent } from './sort-arrow.component';

@NgModule({
    declarations: [SortArrowComponent],
    imports: [CommonModule],
    exports: [SortArrowComponent],
})
export class SortArrowModule {}
