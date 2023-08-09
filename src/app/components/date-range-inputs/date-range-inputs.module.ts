import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MomentDateAdapter,
    MomentDateModule,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DateRangeInputsComponent } from './date-range-inputs.component';
import { CUSTOM_DATE_RANGE_MOMENT_FORMATS } from '../../constants/date-format';

@NgModule({
    declarations: [DateRangeInputsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MomentDateModule,
        MatNativeDateModule,
    ],
    exports: [DateRangeInputsComponent],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: CUSTOM_DATE_RANGE_MOMENT_FORMATS,
        },
    ],
})
export class DateRangeInputsModule {}
