import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { ThemeService } from '../../services/theme/theme.service';
import { UserAccountsService } from '../../services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { AdvancedToggleModule } from '../advanced-toggle/advanced-toggle.module';
import { ThemeToggleModule } from '../theme-toggle/theme-toggle.module';
import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
    let component: UserSettingsComponent;
    let fixture: ComponentFixture<UserSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserSettingsComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
                MatIconModule,
                MatMenuModule,
                ThemeToggleModule,
                AdvancedToggleModule,
            ],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                GeneralLedgerService,
                NotificationsService,
                ThemeService,
                FormBuilder,
                AuthenticationService,
                UserAccountsService,
                DataQualityCheckService,
            ],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(UserSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
