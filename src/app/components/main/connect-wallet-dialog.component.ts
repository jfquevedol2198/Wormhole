import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-connect-wallet-dialog',
    templateUrl: './connect-wallet-dialog.component.html',
    styleUrls: ['connect-wallet-dialog.component.scss'],
})
export class ConnectWalletDialogComponent {
    public accountForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ConnectWalletDialogComponent>,
        private authenticationService: AuthenticationService,
    ) {}

    connectToMetamask() {
        this.authenticationService.authenticationWithMetamask();
        this.dialogRef.close(true);
    }
}
