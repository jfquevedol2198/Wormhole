import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { momentToUtcFormat } from '../../utilities/date-time';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';

@Component({
    selector: 'app-select-date',
    templateUrl: './select-date.component.html',
})
export class SelectDateComponent implements OnInit {
    formGroup: FormGroup;
    isDisabled = true;

    subscriptions = new Subscription();
    constructor(
        public router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder,
        public generalLedgerService: GeneralLedgerService,
    ) {
        // apply date if its already in the url when creating form
        this.formGroup = this.fb.group({
            date: [
                this.getDateValueAndStateFromUrl(
                    this.activatedRoute.snapshot.queryParams['date'],
                ),
                [],
            ],
        });

        // when url changes and there is no date in the url we need to disable and reset value for date
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(filter((data) => !data.date))
                .subscribe((data) => {
                    this.isDisabled = true;
                    this.formGroup.controls.date.setValue('');
                }),
        );

        // when date is in the url and its being broadcast via service we pick it up and set a value in the form
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    filter((data) => !!data.date),
                    map((queryParams) => ({
                        date: queryParams.date,
                        forceRefresh: queryParams.forceRefresh,
                    })),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    filter(
                        (data) =>
                            data.date !== this.formGroup.controls.date.value,
                    ),
                )
                .subscribe((data) => {
                    // date comes in as utc and we need to convert it to local
                    const date = moment.utc(data.date).format();
                    const dateValue = moment.utc(date).local().format();

                    this.formGroup.controls.date.setValue(dateValue);
                }),
        );

        // when date value is changed from the date input redirect date
        this.subscriptions.add(
            this.formGroup.controls.date.valueChanges
                .pipe(debounceTime(500))
                .subscribe((date) => {
                    // if user selected date we know it comes back as moment date
                    if (date instanceof moment) {
                        this.router.navigate([], {
                            queryParams: {
                                date: momentToUtcFormat(moment(date)),
                            },
                            queryParamsHandling: 'merge',
                        });
                    }

                    // if date exists we can enable form
                    if (
                        date &&
                        !this.generalLedgerService.pnlEssentialDataLoading$
                            .value
                    ) {
                        this.isDisabled = false;
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

    protected getDateValueAndStateFromUrl(
        dateFromQueryParams: string | undefined,
    ): { value: string; disabled: boolean } {
        let dateValue = '';
        if (dateFromQueryParams) {
            const date = moment.utc(dateFromQueryParams).format();
            dateValue = moment.utc(date).local().format();
        }
        return { value: dateValue, disabled: true };
    }

    ngOnInit(): void {}
}
