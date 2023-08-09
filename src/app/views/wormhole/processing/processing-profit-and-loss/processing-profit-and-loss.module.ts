import { DynamicTableModule } from 'src/app/components/dynamic-table/dynamic-table.module';
import { SelectPortfolioModule } from 'src/app/components/select-portfolio/select-portfolio.module';
import {
    DATE_FORMAT,
    CUSTOM_MOMENT_FORMATS,
} from 'src/app/constants/date-format';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDateAdapter,
    NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import {
    NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    NgxMatMomentAdapter,
} from '@angular-material-components/moment-adapter';

import { AddProfitAndLossDialogComponent } from './add-profit-and-loss-dialog/add-profit-and-loss-dialog.component';
import { ProcessingProfitAndLossRoutesModule } from './processing-profit-and-loss-routing.module';
import { ProcessingProfitAndLossComponent } from './processing-profit-and-loss.component';
import { PublishProfitAndLossDialogComponent } from './publish-profit-and-loss-dialog/publish-profit-and-loss-dialog.component';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { ArrowButtonModule } from 'src/app/components/arrow-button/arrow-button.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProfitAndLossProgressModule } from './profit-and-loss-progress-stepper/profit-and-loss-progress.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PriorityDialogComponent } from './priority-dialog/priority-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { TableHeaderModule } from 'src/app/components/table-header/table-header.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        ProcessingProfitAndLossComponent,
        AddProfitAndLossDialogComponent,
        PriorityDialogComponent,
        PublishProfitAndLossDialogComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ProcessingProfitAndLossRoutesModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        DynamicTableModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatTableModule,
        TableHeaderModule,
        SelectPortfolioModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatDatepickerModule,
        MatNativeDateModule,
        PaginatorModule,
        ArrowButtonModule,
        MatProgressBarModule,
        ProfitAndLossProgressModule,
        ScrollingModule
    ],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: DATE_FORMAT,
        },
        {
            provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: false },
        },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS },
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ],
    entryComponents: [
        AddProfitAndLossDialogComponent,
        PublishProfitAndLossDialogComponent,
    ],
    exports: [ProcessingProfitAndLossComponent],
})
export class ProcessingProfitAndLossModule { }
