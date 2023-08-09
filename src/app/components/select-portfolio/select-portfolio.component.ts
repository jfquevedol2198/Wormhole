import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';

@Component({
    selector: 'app-select-portfolio',
    templateUrl: './select-portfolio.component.html',
})
export class SelectPortfolioComponent implements OnDestroy {
    public portfolioControls: FormGroup;
    subscriptions = new Subscription();

    constructor(
        public router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder,
        public generalLedgerService: GeneralLedgerService,
    ) {
        const id = this.activatedRoute.snapshot.queryParams['portfolioId'];

        this.portfolioControls = this.fb.group({
            portfolioId: [{ value: id ? +id : 0, disabled: true }, []],
        });

        // when there is no portfolioId in the url we need to wait for it to be broadcast via service
        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    filter((data) => !!data.portfolioId),
                    map((data) => +data.portfolioId),
                    distinctUntilChanged(),
                    filter(
                        (data) =>
                            data !==
                            this.portfolioControls.controls['portfolioId']
                                .value,
                    ),
                )
                .subscribe((data) => {
                    this.portfolioControls.controls['portfolioId'].setValue(
                        data,
                    );
                }),
        );

        // deal with form changes - when portfolio id changes we redirect and remove all dates and other query params
        this.subscriptions.add(
            this.portfolioControls.controls.portfolioId.valueChanges.subscribe(
                (portfolioId) => {
                    this.generalLedgerService.reset();
                    this.router.navigate([], {
                        queryParams: {
                            portfolioId,
                            view: this.activatedRoute.snapshot.queryParams.view,
                            forceRefresh: new Date().getTime(),
                        },
                    });
                },
            ),
        );

        // when portfolios are loaded we can enable it for the user
        this.subscriptions.add(
            this.generalLedgerService.portfolios$
                .pipe(
                    filter(
                        (data) =>
                            data.length > 0 &&
                            this.generalLedgerService.isPortfoliosLoaded,
                    ),
                )
                .subscribe((data) => {
                    this.portfolioControls.controls.portfolioId.enable({
                        emitEvent: false,
                    });
                }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
