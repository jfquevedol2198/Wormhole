import { saveAs } from 'file-saver';
import { ICalendarDialogData } from 'src/app/interfaces/report-calendar.interface';
import { ReportHistoryService } from 'src/app/services/report-history/report-history.service';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-calendar-dialog',
    templateUrl: './calendar-dialog.component.html',
})
export class CalendarDialogComponent {
    columnsToDisplay = ['date', 'action'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ICalendarDialogData,
        public reportHistoryService: ReportHistoryService,
    ) {}

    generateReportFile(reportId: number) {
        this.reportHistoryService
            .downloadReportFile(reportId)
            .subscribe((data: any) => {
                const blob = new Blob([data], { type: 'text/csv' });
                saveAs(blob, `report-${reportId}.csv`);
            });
    }
}
