import { MomentDatePipeModule } from 'src/app/pipes/moment-date/moment-date.module';
import { ReportHistoryService } from 'src/app/services/report-history/report-history.service';
import { WorkersService } from 'src/app/services/workers/workers.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { ReportHistoryCalendarModule } from '../report-history-calendar/report-history-calendar.module';
import { ReportHistoryTableComponent } from './report-history-table.component';

@NgModule({
    declarations: [ReportHistoryTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MomentDatePipeModule,
        ReportHistoryCalendarModule,
    ],
    providers: [ReportHistoryService, WorkersService],
    exports: [ReportHistoryTableComponent],
})
export class ReportHistoryTableModule {}
