import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { OverlayTableComponent } from './overlay-table.component';

@NgModule({
    declarations: [OverlayTableComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatTableModule,
    ],
    exports: [OverlayTableComponent],
})
export class OverlayTableModule {}
