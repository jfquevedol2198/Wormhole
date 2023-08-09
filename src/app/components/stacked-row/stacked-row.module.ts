import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StackedRowComponent } from './stacked-row.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [StackedRowComponent],
    imports: [CommonModule, RouterModule, MatTooltipModule],
    exports: [StackedRowComponent],
})
export class StackedRowModule {}
