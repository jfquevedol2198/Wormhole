import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AdvancedSearchDialogComponent } from '../../../../components/advanced-search-dialog/advanced-search-dialog.component';
import { EditModeAlertDialogComponent } from '../../../../components/edit-mode-alert-dialog/edit-mode-alert-dialog.component';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';

@Component({
    selector: 'app-transactions-fullscreen',
    templateUrl: './transactions-fullscreen.component.html',
    styleUrls: ['./transactions-fullscreen.component.scss'],
})
export class TransactionsFullscreenComponent implements OnInit, OnDestroy {
    transactionsTableDataSubscription = new Subscription();
    reportPresetId: number;

    isEditMode = false;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        public generalLedgerService: GeneralLedgerService,
        public authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.transactionsTableDataSubscription.add(
            this.generalLedgerService.transactions$.subscribe((data) => {
                this.reportPresetId = data.reportPresetId;
                this.isEditMode = data.isEditMode;
            }),
        );
    }

    ngOnDestroy() {
        this.transactionsTableDataSubscription.unsubscribe();
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
