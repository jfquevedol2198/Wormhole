import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMethodProcessingEnum } from 'src/app/interfaces/advancedSearch.interface';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import {
    BY_SELECT_OPTIONS,
    CURRENCY_OPTIONS,
    STATUS_OPTIONS,
} from '../selects-options';

@Component({
    selector: 'app-advanced-search-form',
    templateUrl: './advanced-search-form.component.html',
    styleUrls: ['./advanced-search-form.component.scss'],
})
export class AdvancedSearchFormComponent implements OnInit {
    @Input()
    public form: FormGroup;
    @Input() submitted;
    @Input() platforms;
    @Input() transactionSources;
    @ViewChild('picker') picker: any;
    public date: moment.Moment;
    public showSpinners = true;
    public showSeconds = false;
    public minDate: moment.Moment;
    public maxDate: moment.Moment;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    bySelectOptions = BY_SELECT_OPTIONS;

    currencyOptions = CURRENCY_OPTIONS;
    statusOptions = STATUS_OPTIONS;
    methodProcessingOptions = IMethodProcessingEnum;
    methodProcessingKeys = [];

    filteredPlatforms: Observable<string[]>;
    constructor() {
        this.methodProcessingKeys = Object.keys(
            this.methodProcessingOptions,
        ).filter((k) => !isNaN(Number(k)));
    }
    ngOnInit() {
        this.filteredPlatforms = this.form.controls[
            'platform'
        ].valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value)),
        );
    }
    private _filter(value: string): string[] {
        const filterValue = value && value.toLowerCase();

        return this.platforms.filter((option) =>
            option.toLowerCase().includes(filterValue),
        );
    }
}
