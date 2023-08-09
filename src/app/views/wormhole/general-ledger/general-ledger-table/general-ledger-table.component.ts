import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { AdvancedSearchDialogComponent } from '../../../../components/advanced-search-dialog/advanced-search-dialog.component';
import { EditModeAlertDialogComponent } from '../../../../components/edit-mode-alert-dialog/edit-mode-alert-dialog.component';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { GeneralLedgerService } from '../general-ledger.service';

@Component({
    selector: 'app-general-ledger-table',
    templateUrl: './general-ledger-table.component.html',
    styleUrls: ['./general-ledger-table.component.scss'],
})
export class GeneralLedgerTableComponent implements OnInit, OnDestroy {
    tableView: 'transactions' | 'de-fi-impact' = 'transactions';
    sortingDeFiImpactBy: 'usd' | 'diffPercentage' = 'usd';
    paginationDisabled = false;

    transactionsTableDataSubscription = new Subscription();
    reportPresetId: number;

    isEditMode = false;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        public generalLedgerService: GeneralLedgerService,
        private activatedRoute: ActivatedRoute,
        public authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.transactionsTableDataSubscription.add(
            this.generalLedgerService.transactions$.subscribe((data) => {
                this.reportPresetId = data.reportPresetId;
                this.isEditMode = data.isEditMode;
            }),
        );

        this.tableView =
            this.activatedRoute.snapshot.queryParams.tableView ||
            'transactions';
        this.sortingDeFiImpactBy =
            this.activatedRoute.snapshot.queryParams.sortingDeFiImactBy ||
            'usd';
    }

    ngOnDestroy() {
        this.transactionsTableDataSubscription.unsubscribe();
    }

    onViewChange(tabIndex: number) {
        this.tableView = tabIndex === 0 ? 'transactions' : 'de-fi-impact';
        this.router.navigate([], {
            queryParams: {
                tableView: this.tableView,
                pageIndex: undefined,
                generalTableSorting: undefined,
                sortingDeFiImpactBy: undefined,
                reportPresetId: undefined,
            },
            queryParamsHandling: 'merge',
        });
    }

    onChangeSortingByClick() {
        this.sortingDeFiImpactBy =
            this.sortingDeFiImpactBy === 'usd' ? 'diffPercentage' : 'usd';

        this.router.navigate([], {
            queryParams: {
                sortingDeFiImpactBy: this.sortingDeFiImpactBy,
                generalTableSorting: undefined,
            },
            queryParamsHandling: 'merge',
        });
    }

    openFullscreen() {
        if (this.tableView === 'transactions') {
            this.router.navigate(['/app/fullscreen/transactions'], {
                queryParamsHandling: 'preserve',
            });
        } else {
            this.router.navigate(['/app/fullscreen/de-fi-impact'], {
                queryParamsHandling: 'preserve',
            });
        }
    }

    openDialog() {
        this.dialog.open(AdvancedSearchDialogComponent, {
            data: {
                isToBeSelected: false,
            },
        });
    }

    resetReportPresetId() {
        this.router.navigate([], {
            queryParams: {
                reportPresetId: undefined,
                pageIndex: undefined,
            },
            queryParamsHandling: 'merge',
        });
    }

    onEditModeToggleClick(event) {
        if (!this.isEditMode) {
            const dialogRef = this.dialog.open(EditModeAlertDialogComponent);

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.isEditMode = !this.isEditMode;
                    this.generalLedgerService.isEditMode$.next(this.isEditMode);
                } else {
                    event.source.checked = false;
                }
            });
        } else {
            this.isEditMode = !this.isEditMode;
            this.generalLedgerService.isEditMode$.next(this.isEditMode);
        }
    }
}
