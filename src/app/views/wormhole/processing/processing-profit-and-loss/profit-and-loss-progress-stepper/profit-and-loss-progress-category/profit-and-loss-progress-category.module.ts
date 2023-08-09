import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ProfitAndLossProgressCategoryComponent } from './profit-and-loss-progress-category.component';

@NgModule({
    declarations: [ProfitAndLossProgressCategoryComponent],
    imports: [CommonModule, MatIconModule],
    exports: [ProfitAndLossProgressCategoryComponent],
})
export class PnlProgressCategoryModule { }
