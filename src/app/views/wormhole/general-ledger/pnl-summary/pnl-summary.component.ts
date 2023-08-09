import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { filter, map } from 'rxjs/operators';

import { IPNLPerformanceData } from '../../../../interfaces/pnlPerformanceData.interface';

import { GeneralLedgerService } from '../general-ledger.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment/moment';
import { combineLatest, Subscription } from 'rxjs';

@Component({
    selector: 'app-pnl-summary',
    templateUrl: './pnl-summary.component.html',
    styleUrls: ['./pnl-summary.component.scss'],
})
export class PnlSummaryComponent implements OnInit, OnDestroy {
    @Input() alignCenter = false;
    pnlData: IPNLPerformanceData;
    subscription: Subscription;

    constructor(
        public generalLedgerService: GeneralLedgerService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.subscription = combineLatest([
            this.generalLedgerService.pnlEssentialData$,
            this.activatedRoute.queryParams,
        ])
            .pipe(
                filter(([data, params]) => {
                    return data.length > 0 && params.date;
                }),
                map(([data, params]) =>
                    data.find((item) =>
                        item.date.isSame(moment.utc(params.date)),
                    ),
                ),
            )
            .subscribe((performance) => {
                this.pnlData = performance;
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
