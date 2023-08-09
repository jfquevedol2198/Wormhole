import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { CalendarDialogModule } from './calendar-dialog/calendar-dialog.module';
import { ReportHistoryCalendarComponent } from './report-history-calendar.component';

@NgModule({
    declarations: [ReportHistoryCalendarComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        CalendarDialogModule,
    ],
    providers: [],
    exports: [ReportHistoryCalendarComponent],
})
export class ReportHistoryCalendarModule {}
