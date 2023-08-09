import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { IAccountDataSummary } from '../../interfaces/accountDataSummary.interface';
import { AccountingService } from '../../services/accounting/accounting.service';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';

const DATA_QUALITY_CHECK_INTERVAL = 10000;

@Component({
    selector: 'app-pnl-progress',
    templateUrl: './pnl-progress.component.html',
    styleUrls: ['./pnl-progress.component.scss'],
})
export class PnlProgressComponent implements OnInit, OnDestroy {
    @Input() portfolioId: number;
    subscriptions: Subscription = new Subscription();

    dataQualityCheckInterval: NodeJS.Timeout;
    accountDataSummary: IAccountDataSummary[];

    constructor(
        private accountingService: AccountingService,
        private dataQualityCheckService: DataQualityCheckService,
    ) {}

    ngOnInit() {
        this.getAccountDataSummary();

        this.dataQualityCheckInterval = setInterval(
            () => this.getAccountDataSummary(),
            DATA_QUALITY_CHECK_INTERVAL,
        );
    }

    ngOnDestroy() {
        if (this.dataQualityCheckInterval) {
            clearInterval(this.dataQualityCheckInterval);
        }

        this.subscriptions.unsubscribe();
    }

    estimateTimeRemaining(): number {
        return this.accountDataSummary
            ? this.accountDataSummary.reduce(
                  (a, c) => a + c.syncPercentage * 60 * 60,
                  0,
              )
            : 0;
    }

    getAccountDataSummary() {
        this.subscriptions.add(
            this.accountingService
                .getLedgerAccounts(this.portfolioId)
                .pipe(
                    filter((accounts) => !!accounts.length),
                    switchMap((accounts) =>
                        this.dataQualityCheckService.getAccountDataSummary(
                            accounts[0].ledgerAccountId,
                        ),
                    ),
                    take(1),
                )
                .subscribe(
                    (accountDataSummary) =>
                        (this.accountDataSummary = accountDataSummary.filter(
                            (summary) => summary.syncPercentage !== undefined,
                        )),
                ),
        );
    }
}
