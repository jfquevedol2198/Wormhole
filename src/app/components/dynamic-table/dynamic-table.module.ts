import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AppTooltipModule } from '../app-tooltip/app-tooltip.module';
import { BasicDynamicTableModule } from '../basic-dynamic-table/basic-dynamic-table.module';
import { ChipModule } from '../chip/chip.module';
import { ProgressTooltipModule } from '../interactive-tooltip/progress-tooltip/progress-tooltip.module';
import { LogoIconModule } from '../logo-icon/logo-icon.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { DynamicTableDialogComponent } from './dynamic-table-dialog/dynamic-table-dialog.component';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
    declarations: [DynamicTableComponent, DynamicTableDialogComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule,
        LogoIconModule,
        ChipModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatButtonModule,
        MatMenuModule,
        PaginatorModule,
        MatCheckboxModule,
        MatDialogModule,
        BasicDynamicTableModule,
        ProgressTooltipModule,
        AppTooltipModule,
        NgxTippyModule,
    ],
    entryComponents: [DynamicTableDialogComponent],
    exports: [DynamicTableComponent],
})
export class DynamicTableModule {}
