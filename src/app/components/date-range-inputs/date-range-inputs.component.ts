import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
} from 'rxjs/operators';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { momentToUtcFormat } from '../../utilities/date-time';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';

@Component({
    selector: 'app-date-range-inputs',
    templateUrl: './date-range-inputs.component.html',
})
export class DateRangeInputsComponent {
    subscriptions = new Subscription();
    rangeForm: FormGroup;
    isDisabled = true;

    constructor(
        private readonly fb: FormBuilder,
        public generalLedgerService: GeneralLedgerService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
        // apply dates if its already in the url when creating form
        this.rangeForm = this.fb.group({
            fromDate: [
                {
                    value: this.getDateValueFromUrl(
                        this.activatedRoute.snapshot.queryParams['fromDate'],
                    ),
                },
                [],
            ],
            toDate: [
                {
                    value: this.getDateValueFromUrl(
                        this.activatedRoute.snapshot.queryParams['toDate'],
                    ),
                },
                [],
            ],
        });

        // when url changes and there are no dates in the url we need to disable and reset values for dates
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(filter((data) => !data.fromDate || !data.toDate))
                .subscribe((data) => {
                    this.rangeForm.controls.fromDate.setValue('');
                    this.rangeForm.controls.toDate.setValue('');
                    this.isDisabled = true;
                }),
        );

        // when date is in the url and its being broadcast via service we pick it up and set a value in the form
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    filter((data) => !!data.fromDate && !!data.toDate),
                    map((queryParams) => ({
                        fromDate: queryParams.fromDate,
                        toDate: queryParams.toDate,
                        forceRefresh: queryParams.forceRefresh,
                    })),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    filter(
                        (data) =>
                            data.fromDate !==
                                this.rangeForm.controls.fromDate.value ||
                            data.toDate !==
                                this.rangeForm.controls.toDate.value,
                    ),
                )
                .subscribe((data) => {
                    // dates come in as utc and we need to convert them to local
                    const fromDate = moment.utc(data.fromDate).format();
                    const fromDateValue = moment.utc(fromDate).local().format();
                    this.rangeForm.controls.fromDate.setValue(fromDateValue);

                    const toDate = moment.utc(data.toDate).format();
                    const toDateValue = moment.utc(toDate).local().format();
                    this.rangeForm.controls.toDate.setValue(toDateValue);
                }),
        );

        // when date values are changed from the date input redirect dates
        this.subscriptions.add(
            this.rangeForm.valueChanges
                .pipe(debounceTime(500))
                .subscribe((value) => {
                    // if user selected date we know it comes back as moment date
                    if (
                        value.fromDate instanceof moment &&
                        value.toDate instanceof moment
                    ) {
                        this.router.navigate([], {
                            queryParams: {
                                fromDate: momentToUtcFormat(
                                    moment(value.fromDate),
                                ),
                                toDate: momentToUtcFormat(moment(value.toDate)),
                            },
                            queryParamsHandling: 'merge',
                        });
                    }
                }),
        );

        this.subscriptions.add(
            this.generalLedgerService.pnlEssentialDataLoading$.subscribe(
                (data) => {
                    this.isDisabled = data;
                },
            ),
        );
    }

    protected getDateValueFromUrl(
        dateFromQueryParams: string | undefined,
    ): string {
        let dateValue = '';
        if (dateFromQueryParams) {
            const date = moment.utc(dateFromQueryParams).format();
            dateValue = moment.utc(date).local().format();
        }
        return dateValue;
    }
}
