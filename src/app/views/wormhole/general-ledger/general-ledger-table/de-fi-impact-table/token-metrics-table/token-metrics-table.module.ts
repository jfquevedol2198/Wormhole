import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { TokenMetricsTableComponent } from './token-metrics-table.component';

@NgModule({
    declarations: [TokenMetricsTableComponent],
    imports: [CommonModule, MatTableModule],
    exports: [TokenMetricsTableComponent],
})
export class TokenMetricsTableModule {}
