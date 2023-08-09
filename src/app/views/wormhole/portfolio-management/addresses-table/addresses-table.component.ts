import moment from 'moment';
import { forkJoin, Observable } from 'rxjs';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ILedgerAccount } from '../../../../interfaces/account.interface';
import { IAccountPNLProgressData } from '../../../../interfaces/accountDataSummary.interface';
import { IAccountEstimations } from '../../../../interfaces/accountEstimations.interface';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { BlockchainService } from '../../../../services/blockchain/blockchain.service';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';
import { addressColumns } from './address-columns';
import { ImportTransactionsDialogComponent } from './import-transactions-dialog.component';

@Component({
    selector: 'app-addresses-table',
    templateUrl: './addresses-table.component.html',
    styleUrls: [
        './addresses-table.component.scss',
        '../add-address-dialog.component.scss',
    ],
})
export class AddressesTableComponent implements OnInit {
    @Input() ledgerName: string;
    @Input() accounts: ILedgerAccount[];
    @Input() selectedPortfolioId: number;
    @Output() refreshPortfolioData: EventEmitter<any> = new EventEmitter<any>();
    @Output() refreshAccountsData: EventEmitter<number> =
        new EventEmitter<number>();
    columns = addressColumns;
    displayedColumns: string[];
    updateDataInterval: NodeJS.Timeout;
    updateDataIntervalDelay: number = 60000;

    constructor(
        public accountingService: AccountingService,
        private blockchainService: BlockchainService,
        private dataQualityCheckService: DataQualityCheckService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.displayedColumns = this.columns.map((column) => column.columnDef);
        this.updateAccountsData();
        this.setUpdateDataInterval();
    }

    ngOnDestroy() {
        if (this.updateDataInterval) {
            clearInterval(this.updateDataInterval);
        }
    }

    updateAccountsData() {
        this.getAccountEstimations();
        this.getAccountPNLProgresses();
    }

    getAccountEstimations() {
        const items: Observable<IAccountEstimations>[] = [];
        this.accounts.forEach((account) => {
            if (account.state === 'Active') {
                items.push(
                    this.blockchainService.getAddressEstimation(
                        this.ledgerName,
                        account.ledgerAddress,
                    ),
                );
            }
        });

        forkJoin(items).subscribe((accountEstimations) => {
            accountEstimations.map((estimation) => {
                const account = this.accounts.filter(
                    (account) =>
                        account.ledgerAddress === estimation.ledgerAddress,
                )[0];

                const remainingTime = moment(estimation.endDate).diff(
                    moment(),
                    'minutes',
                );
                if (remainingTime > 0) {
                    account.estimatedEndDate = estimation.endDate;
                    account.remainingTime =
                        remainingTime > 60
                            ? Math.round(remainingTime / 60) + 'h'
                            : remainingTime + 'm';
                }
            });
        });
    }

    getAccountPNLProgresses() {
        const items: Observable<IAccountPNLProgressData>[] = [];
        this.accounts.forEach((account) => {
            if (account.state === 'Active') {
                items.push(
                    this.dataQualityCheckService.getPNLProgress(
                        account.ledgerAccountId,
                    ),
                );
            }
        });

        forkJoin(items).subscribe((pnlProgresses) => {
            pnlProgresses.map((pnlProgress) => {
                const account = this.accounts.filter(
                    (account) =>
                        account.ledgerAccountId === pnlProgress.ledgerAccountId,
                )[0];

                account.syncedPercentage = pnlProgress.syncPercentage;
                account.syncedTimestamp = pnlProgress.syncTimestamp;
            });
        });
    }

    setUpdateDataInterval() {
        this.updateDataInterval = setInterval(() => {
            this.getAccountEstimations();
            this.getAccountPNLProgresses();
        }, this.updateDataIntervalDelay);
    }

    onDeleteAddressClick(removedAccount: ILedgerAccount) {
        this.accountingService
            .modifyPortfolio({
                portfolioId: this.selectedPortfolioId,
                accountsToRemove: [removedAccount],
            })
            .subscribe((response) => {
                if (
                    response.message ===
                    'Successfully updated existing portfolio'
                ) {
                    this.refreshPortfolioData.emit();
                    this.refreshAccountsData.emit(this.selectedPortfolioId);
                }
            });
    }

    onImportTransactionsClick() {
        const dialogRef = this.dialog.open(ImportTransactionsDialogComponent, {
            data: {
                ledgerName: this.ledgerName,
            },
        });
    }
}
