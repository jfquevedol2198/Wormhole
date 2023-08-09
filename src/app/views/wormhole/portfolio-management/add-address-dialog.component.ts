import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ILedgerAccount } from '../../../interfaces/account.interface';
import { AccountingService } from '../../../services/accounting/accounting.service';

@Component({
    selector: 'app-add-address-dialog',
    templateUrl: './add-address-dialog.component.html',
    styleUrls: ['add-address-dialog.component.scss'],
})
export class AddAddressDialogComponent {
    isAllAccountsLoading: boolean = true;
    allAccounts: ILedgerAccount[] = [];
    selectedAccounts: ILedgerAccount[] = [];
    constructor(
        private accountingService: AccountingService,
        public dialogRef: MatDialogRef<AddAddressDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.accountingService.getLedgerAccounts().subscribe((accounts) => {
            this.allAccounts = accounts
                .filter(
                    (account) =>
                        account.ledgerName === this.data.ledgerData.name,
                )
                .filter(
                    (account) =>
                        !this.data.ledgerData.ledgerAccounts.some(
                            (ledgerAccount) =>
                                ledgerAccount.ledgerAccountId ===
                                account.ledgerAccountId,
                        ),
                );
            this.isAllAccountsLoading = false;
        });
    }

    onAddAddressClick() {
        this.accountingService
            .modifyPortfolio({
                portfolioId: this.data.portfolioId,
                accountsToAdd: this.selectedAccounts,
            })
            .subscribe((response) => {
                if (
                    response.message ===
                    'Successfully updated existing portfolio'
                ) {
                    this.dialogRef.close(true);
                }
            });
    }

    onAddressClick(ledgerAccount: ILedgerAccount) {
        if (
            this.selectedAccounts.some(
                (selectedAccount) =>
                    selectedAccount.ledgerAccountId ===
                    ledgerAccount.ledgerAccountId,
            )
        ) {
            this.selectedAccounts = this.selectedAccounts.filter(
                (selectedAccount) => selectedAccount !== ledgerAccount,
            );
        } else {
            this.selectedAccounts.push(ledgerAccount);
        }
    }

    isAccountSelected(ledgerAccount: ILedgerAccount) {
        return this.selectedAccounts.some(
            (selectedAccount) =>
                ledgerAccount.ledgerAccountId ===
                selectedAccount.ledgerAccountId,
        );
    }
}
