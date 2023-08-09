import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, Routes } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ConnectWalletDialogComponent } from './connect-wallet-dialog.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    @Input() routes?: Routes;
    @Input() areUserSettingsVisible?: boolean;

    walletAddress: string;

    constructor(
        public authenticationService: AuthenticationService,
        private dialog: MatDialog,
        private router: Router,
    ) {
        this.authenticationService.userRoles$.subscribe((userRole) => {
            this.walletAddress = userRole
                ? this.authenticationService.publicAddress$.getValue()
                : 'Connect Wallet';
        });
    }

    onConnectWalletClick() {
        const dialogRef = this.dialog.open(ConnectWalletDialogComponent);
    }

    redirectToMainPage() {
        this.router.navigate(['/app/portfolio-management']);
    }
}
