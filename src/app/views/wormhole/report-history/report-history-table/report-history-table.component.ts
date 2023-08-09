import moment, { Moment } from 'moment';
import {
    ICalendarData,
    IDatesFromReport,
} from 'src/app/interfaces/report-calendar.interface';
import { IReport } from 'src/app/interfaces/reportHistory.interface';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-report-history-table',
    templateUrl: './report-history-table.component.html',
    styleUrls: ['./report-history-table.component.scss'],
})
export class ReportHistoryTableComponent implements OnInit {
    @Input() reports: IReport[] = [];

    datesSelected: IDatesFromReport[] = [];
    now: Moment;

    months: ICalendarData[] = [];
    constructor() {}

    ngOnInit() {
        this.now = moment('01-01', 'DD-MM');
        this.reset();
    }

    getActualYear() {
        const date = new Date();
        return date.getFullYear();
    }
    getMonthsObject(now: Moment) {
        const loop = [...Array(12).keys()];
        const data: ICalendarData[] = [];

        loop.forEach((index) => {
            const moment1 = now.clone().add(index, 'months');

            data.push({
                month: moment1.format('MMMM'),
                monthNumber: moment1.format('MM'),
                startAt: moment1.toDate(),
                datesSelected: [],
            });
        });

        return data;
    }
    setProperMonthAndYear() {
        this.datesSelected.map(({ createdDate, reportId }) => {
            const createdDateMonth = moment(createdDate).format('MM');
            const createdDateYear = moment(createdDate).format('YYYY');

            if (
                createdDateYear === this.now.format('YYYY') &&
                createdDateMonth ===
                    this.months[+createdDateMonth - 1].monthNumber
            ) {
                const formattedDate = moment(createdDate).format('YYYY-MM-DD');

                this.months[+createdDateMonth - 1].datesSelected.push({
                    formattedDate,
                    reportId,
                    fullDate: createdDate,
                });
            }
        });
    }

    setAllSelectedDays() {
        return this.reports.map((report: IReport) => {
            return {
                createdDate: report.createdDate,
                reportId: report.reportId,
            };
        });
    }

    setYear(amount: number) {
        this.now.add(amount, 'years');
        this.reset();
    }

    private reset() {
        this.months = this.getMonthsObject(this.now);
        this.datesSelected = this.setAllSelectedDays();
        this.setProperMonthAndYear();
    }
}
