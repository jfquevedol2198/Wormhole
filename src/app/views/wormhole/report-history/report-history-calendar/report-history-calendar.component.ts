import { IDatesSelected } from 'src/app/interfaces/report-calendar.interface';

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

@Component({
    selector: 'app-report-history-calendar',
    templateUrl: './report-history-calendar.component.html',
    styleUrls: ['./report-history-calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ReportHistoryCalendarComponent implements OnInit {
    @Input() startAt: Date;
    @Input() datesSelected: IDatesSelected[];
    @Input() startDate;

    newDate = null;
    formattedDates: string[] = [];

    constructor(public dialog: MatDialog) {}
    ngOnInit() {
        this.formattedDates = this.datesSelected.map((dateSelected) => {
            return dateSelected.formattedDate;
        });
    }

    isSelected = (event) => {
        const date =
            event._i.year +
            '-' +
            ('00' + (event._i.month + 1)).slice(-2) +
            '-' +
            ('00' + event._i.date).slice(-2);

        return this.formattedDates.find((x) => x == date) ? 'selected' : null;
    };
    filterReportsListByDate(formattedDate: string) {
        return this.datesSelected.filter((item) => {
            if (item.formattedDate === formattedDate) {
            }
            return item.formattedDate === formattedDate;
        });
    }
    selectedChange(event) {
        const formattedDate = event.format('YYYY-MM-DD');
        const properData = this.filterReportsListByDate(formattedDate);
        if (properData.length) {
            this.dialog.open(CalendarDialogComponent, {
                data: {
                    properData,
                },
            });
            this.newDate = null;
        }
    }
}
