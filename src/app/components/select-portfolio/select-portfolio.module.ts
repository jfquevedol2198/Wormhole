import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { SelectPortfolioComponent } from './select-portfolio.component';

@NgModule({
    declarations: [SelectPortfolioComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
    ],
    exports: [SelectPortfolioComponent],
})
export class SelectPortfolioModule {}
