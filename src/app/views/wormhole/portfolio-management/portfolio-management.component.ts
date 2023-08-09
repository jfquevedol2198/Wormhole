import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ILedgerData } from '../../../interfaces/ledger.interface';
import { IPortfolio } from '../../../interfaces/portfolio.interface';
import { IUserRoles } from '../../../interfaces/setting.interface';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ReferenceDataService } from '../../../services/reference-data/reference-data.service';
import { AddAddressDialogComponent } from './add-address-dialog.component';
import { AddAddressManuallyDialogComponent } from './add-address-manually-dialog.component';
import { AddPortfolioDialogComponent } from './add-portfolio-dialog.component';
import { AlertDialogComponent } from './alert-dialog.component';
import { ModifyPortfolioDialogComponent } from './modify-portfolio-dialog.component';

@Component({
    selector: 'app-portfolio-management',
    templateUrl: './portfolio-management.component.html',
    styleUrls: ['./portfolio-management.component.scss'],
})
export class PortfolioManagementComponent implements OnDestroy, OnInit {
    selectedPortfolioSubscription: Subscription;

    portfolios: IPortfolio[] = [];
    selectedPortfolioId$: BehaviorSubject<number> = new BehaviorSubject<number>(
        undefined,
    );
    ledgerData: ILedgerData[] = [];

    isPortfolioListLoading = true;
    isLedgersLoading = true;
    ledgerListLoadingDelay = 700;

    constructor(
        private accountingService: AccountingService,
        private referenceDataService: ReferenceDataService,
        private authenticationService: AuthenticationService,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.authenticationService.userRoles$.subscribe((userRole) => {
            if (
                userRole &&
                (userRole.includes(IUserRoles.ROLE_USER_DATA_VALIDATOR) ||
                    userRole.includes(IUserRoles.ROLE_USER_PORTFOLIO_MANAGER))
            ) {
                setTimeout(() => {
                    this.dealWithAuthenticatedUser();
                }, 300);
            } else {
                this.dealWithUnauthenticatedUser();
            }
        });
    }

    ngOnDestroy() {
        if (this.selectedPortfolioSubscription) {
            this.selectedPortfolioSubscription.unsubscribe();
        }
    }

    dealWithAuthenticatedUser() {
        this.refreshPortfolioData();

        this.activatedRoute.queryParams
            .pipe(
                filter((queryParams) => queryParams.portfolioId),
                map((queryParams) => +queryParams.portfolioId),
            )
            .subscribe((portfolioId) => {
                this.selectedPortfolioId$.next(portfolioId);
            });

        this.selectedPortfolioSubscription = this.selectedPortfolioId$
            .pipe(distinctUntilChanged())
            .subscribe((selectedPortfolioId) => {
                if (!this.ledgerData.length) {
                    this.initLedgerData();
                } else {
                    this.updateAccounts(selectedPortfolioId);
                }
            });
    }

    initLedgerData() {
        this.referenceDataService
            .getSupportedLedgers()
            .pipe(
                tap((ledgers) => {
                    ledgers.forEach((ledger) => {
                        this.ledgerData.push({
                            name: ledger,
                        });
                    });
                }),
            )
            .subscribe(() => {
                this.updateAccounts(this.selectedPortfolioId$.getValue());
            });
    }

    dealWithUnauthenticatedUser() {
        if (this.selectedPortfolioSubscription) {
            this.selectedPortfolioSubscription.unsubscribe();
        }
        this.router.navigate([], {
            queryParams: undefined,
        });
        this.isPortfolioListLoading = false;
        this.isLedgersLoading = false;
        this.portfolios = [];
        this.ledgerData = [];
        this.selectedPortfolioId$.next(undefined);
    }

    updateAccounts(selectedPortfolioId?: number) {
        this.isLedgersLoading = true;
        this.accountingService
            .getLedgerAccounts(selectedPortfolioId)
            .subscribe((accounts) => {
                this.ledgerData = this.ledgerData.map((ledgerData) => {
                    const ledgerAccounts = accounts.filter(
                        (account) => account.ledgerName === ledgerData.name,
                    );
                    return {
                        ...ledgerData,
                        ledgerAccounts,
                        isExpanded: ledgerData.isExpanded || false,
                        title: this.convertLedgerName(ledgerData.name),
                    };
                });
                this.isLedgersLoading = false;
            });
    }

    onPortfolioClick(selectedPortfolio: IPortfolio) {
        this.router.navigate([], {
            queryParams: {
                portfolioId: selectedPortfolio.portfolioId,
            },
            queryParamsHandling: 'merge',
        });
    }

    convertLedgerName(ledgerName: string): string {
        return ledgerName
            .split(/(?=[A-Z])/)
            .join(' ')
            .toUpperCase();
    }

    expandLedger(ledgerData: ILedgerData) {
        ledgerData.isExpanded = !ledgerData.isExpanded;
    }

    onAddPortfolioClick() {
        if (this.authenticationService.userRoles$.getValue()) {
            const dialogRef = this.dialog.open(AddPortfolioDialogComponent);

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.refreshPortfolioData();
                }
            });
        } else {
            const dialogRef = this.dialog.open(AlertDialogComponent);
        }
    }

    refreshPortfolioData() {
        this.isPortfolioListLoading = true;
        this.accountingService.getPortfolios().subscribe((portfolios) => {
            this.portfolios = portfolios;
            this.isPortfolioListLoading = false;
        });
    }

    onAddAddressManuallyClick(ledgerData: ILedgerData) {
        const dialogRef = this.dialog.open(AddAddressManuallyDialogComponent, {
            data: {
                portfolioId: this.selectedPortfolioId$.getValue(),
                ledgerName: ledgerData.name,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.refreshPortfolioData();
                this.updateAccounts(this.selectedPortfolioId$.getValue());
            }
        });
    }

    onAddAddressFromExistingClick(ledgerData: ILedgerData) {
        const dialogRef = this.dialog.open(AddAddressDialogComponent, {
            data: {
                portfolioId: this.selectedPortfolioId$.getValue(),
                ledgerData: ledgerData,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.refreshPortfolioData();
                this.updateAccounts(this.selectedPortfolioId$.getValue());
            }
        });
    }

    onRemovePortfolioClick(portfolio: IPortfolio) {
        this.accountingService
            .removePortfolio(portfolio.portfolioId)
            .subscribe(() => {
                this.refreshPortfolioData();
                this.updateAccounts(portfolio.portfolioId);
            });
    }

    onModifyPortfolioClick(portfolio: IPortfolio) {
        const dialogRef = this.dialog.open(ModifyPortfolioDialogComponent, {
            data: {
                name: portfolio.name,
                portfolioId: portfolio.portfolioId,
                description: portfolio.description,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.refreshPortfolioData();
            }
        });
    }
}
