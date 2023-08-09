import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

import {
    CUSTOM_MOMENT_FORMATS,
    DATE_FORMAT,
} from '../../constants/date-format';
import { SelectDateComponent } from './select-date.component';

@NgModule({
    declarations: [SelectDateComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    exports: [SelectDateComponent],
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
export class SelectDateModule {}
