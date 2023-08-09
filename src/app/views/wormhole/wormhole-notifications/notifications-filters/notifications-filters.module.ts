import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

import { DateRangeInputsModule } from '../../../../components/date-range-inputs/date-range-inputs.module';
import {
    CUSTOM_MOMENT_FORMATS,
    DATE_FORMAT,
} from '../../../../constants/date-format';
import { NotificationsFiltersComponent } from './notifications-filters.component';

@NgModule({
    declarations: [NotificationsFiltersComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        DateRangeInputsModule,
    ],
    exports: [NotificationsFiltersComponent],
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
export class NotificationsFiltersModule {}
