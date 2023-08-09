import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { PnlProgressDialogComponent } from '../pnl-progress-dialog/pnl-progress-dialog.component';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
    @Input() userSettings: boolean;

    public formGroup: FormGroup;

    searchTerm = '';

    notificationTotal = 0;

    isSearchInputOpen = false;

    constructor(
        public dialog: MatDialog,
        public notificationsService: NotificationsService,
        public authenticationService: AuthenticationService,
        private router: Router,
        private fb: FormBuilder,
        private generalLedgerService: GeneralLedgerService,
    ) {
        this.formGroup = this.fb.group({
            searchInput: '',
        });
    }

    getFormattedBadgeNumber(notificationCount: number): string {
        const numberOfDigits = notificationCount.toString().length;
        if (numberOfDigits < 4) {
            return `${notificationCount}`;
        } else if (notificationCount === 4 || notificationCount > 4) {
            return '>1K';
        }
    }

    ngOnInit(): void {
        if (this.isNotificationsAvailable()) {
            // check every number of seconds for new notifications or we should use some form of push notifications ideally
            timer(0, 60000)
                .pipe(
                    switchMap(() =>
                        this.notificationsService.getTotalNotifications(),
                    ),
                )
                .subscribe((data) => {
                    const formattedBadgeNumber =
                        this.getFormattedBadgeNumber(data);

                    this.notificationsService.setTotalNotifications(
                        formattedBadgeNumber,
                    );
                });
        }
    }

    toggleNotifications(): void {
        if (this.router.url.split('?')[0] === '/app/notifications') {
            history.back();
        } else {
            this.router.navigate(['/app/notifications'], {
                queryParams: {
                    pageIndex: undefined,
                },
                queryParamsHandling: 'merge',
            });
        }
    }

    showPnlProgress() {
        this.dialog.open(PnlProgressDialogComponent, {
            width: '90%',
        });
    }

    onLogOutClick() {
        this.authenticationService.logOut();
        this.generalLedgerService.portfolios$.next([]);
        this.router.navigate(['/app/portfolio-management'], {
            queryParams: undefined,
        });
    }

    isSearchAvailable() {
        return (
            this.authenticationService.isDataValidator() ||
            this.authenticationService.isPortfolioManager()
        );
    }

    isNotificationsAvailable() {
        return (
            this.authenticationService.isDataValidator() ||
            this.authenticationService.isPortfolioManager() ||
            this.authenticationService.isDataAdmin()
        );
    }

    isUserSettingsAvailable() {
        return (
            this.authenticationService.isDataValidator() ||
            this.authenticationService.isPortfolioManager() ||
            this.authenticationService.isDataAdmin() ||
            this.authenticationService.isAdministrator()
        );
    }

    isSimpleViewAvailable() {
        return (
            this.authenticationService.isDataValidator() ||
            this.authenticationService.isPortfolioManager()
        );
    }

    isSettingsAvailable() {
        return this.authenticationService.isAdministrator();
    }

    isPNLProgressAvailable() {
        return (
            this.authenticationService.isDataValidator() ||
            this.authenticationService.isPortfolioManager()
        );
    }
}
