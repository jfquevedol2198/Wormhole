import { NgScrollbarModule } from 'ngx-scrollbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
    NGX_MAT_DATE_FORMATS,
    NgxMatDateAdapter,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import {
    NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    NgxMatMomentAdapter,
} from '@angular-material-components/moment-adapter';

import { SelectDateModule } from '../../../../components/select-date/select-date.module';
import { SelectPortfolioModule } from '../../../../components/select-portfolio/select-portfolio.module';
import {
    CUSTOM_MOMENT_FORMATS,
    DATE_FORMAT,
} from '../../../../constants/date-format';
import { PnlSummaryModule } from '../pnl-summary/pnl-summary.module';
import { GeneralLedgerToolbarComponent } from './general-ledger-toolbar.component';

@NgModule({
    declarations: [GeneralLedgerToolbarComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatTooltipModule,
        MomentDateModule,
        PnlSummaryModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgScrollbarModule,
        SelectPortfolioModule,
        SelectDateModule,
    ],
    exports: [GeneralLedgerToolbarComponent],
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
    ],
})
export class GeneralLedgerToolbarModule {}
