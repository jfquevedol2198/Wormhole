import { Moment } from 'moment';

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-notifications-filters',
    templateUrl: './notifications-filters.component.html',
    styleUrls: ['./notifications-filters.component.scss'],
})
export class NotificationsFiltersComponent implements OnInit {
    @Input() filtersForm: FormGroup;

    public date: Moment;
    public showSpinners = true;
    public showSeconds = false;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    fromDateMax;
    toDateMin;

    severityOptions = ['None', 'Warning', 'Error', 'Info'];
    typeOptions = [
        'None',
        'WorkerTasks',
        'MissingAddressLabel',
        'MissingMethodDefinition',
        'MissingExchangeRatePair',
    ];

    addSpaceAfterCapitalLetter(type) {
        return type.replace(/([A-Z])/g, ' $1').trim();
    }

    ngOnInit() {
        this.filtersForm.get('fromDate').valueChanges.subscribe((fromDate) => {
            this.toDateMin = fromDate;
        });

        this.filtersForm.get('toDate').valueChanges.subscribe((toDate) => {
            this.fromDateMax = toDate;
        });
    }
}
