import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorDialogModule } from './components/error-dialog/error-dialog.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { AccountingService } from './services/accounting/accounting.service';
import { ApiService } from './services/api/api.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { DataQualityCheckService } from './services/dataQualityCheck/dataQualityCheck.service';
import { ThemeService } from './services/theme/theme.service';
import { UserAccountsService } from './services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from './views/wormhole/general-ledger/general-ledger.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ErrorHandlerModule,
        ErrorDialogModule,
    ],
    providers: [
        AuthenticationService,
        ConfigurationService,
        ThemeService,
        AccountingService,
        ApiService,
        DataQualityCheckService,
        GeneralLedgerService,
        UserAccountsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
