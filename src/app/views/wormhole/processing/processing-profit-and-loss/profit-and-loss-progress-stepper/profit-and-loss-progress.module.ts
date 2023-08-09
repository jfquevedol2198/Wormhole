import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PnlProgressCategoryModule } from './profit-and-loss-progress-category/profit-and-loss-progress-category.module';
import { ProfitAndLossProgressComponent } from './profit-and-loss-progress.component';

@NgModule({
    declarations: [ProfitAndLossProgressComponent],
    imports: [
        CommonModule,
        PnlProgressCategoryModule,
        MatProgressSpinnerModule,
    ],
    exports: [ProfitAndLossProgressComponent],
})
export class ProfitAndLossProgressModule { }
