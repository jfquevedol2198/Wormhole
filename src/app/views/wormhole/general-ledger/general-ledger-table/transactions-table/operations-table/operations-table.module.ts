import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DynamicTableTooltipModule } from '../../../../../../components/interactive-tooltip/dynamic-table-tooltip/dynamic-table-tooltip.module';
import { LogoIconModule } from '../../../../../../components/logo-icon/logo-icon.module';
import { NoDataCommunicateModule } from '../../../../../../components/no-data-communicate/no-data-communicate.module';
import { AddOperationDialogComponent } from './add-operation-dialog.component';
import { EditOperationDialogComponent } from './edit-operation-dialog.component';
import { OperationsTableComponent } from './operations-table.component';
import { OverlayTableModule } from './overlay-table/overlay-table.module';

@NgModule({
    declarations: [
        OperationsTableComponent,
        AddOperationDialogComponent,
        EditOperationDialogComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        LogoIconModule,
        DynamicTableTooltipModule,
        NgxTippyModule,
        MatSlideToggleModule,
        MatTooltipModule,
        NoDataCommunicateModule,
        MatDialogModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        OverlayTableModule,
    ],
    exports: [OperationsTableComponent],
})
export class OperationsTableModule {}
