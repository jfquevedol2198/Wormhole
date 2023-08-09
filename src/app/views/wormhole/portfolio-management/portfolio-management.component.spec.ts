import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { ReferenceDataService } from '../../../services/reference-data/reference-data.service';
import { UserAccountsService } from '../../../services/user-accounts/user-accounts.service';
import { PortfolioManagementComponent } from './portfolio-management.component';

describe('PortfolioManagementComponent', () => {
    let component: PortfolioManagementComponent;
    let fixture: ComponentFixture<PortfolioManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PortfolioManagementComponent],
            imports: [
                HttpClientTestingModule,
                MatProgressSpinnerModule,
                RouterTestingModule,
                MatDialogModule,
            ],
            providers: [
                ReferenceDataService,
                FormBuilder,
                ApiService,
                ConfigurationService,
                AccountingService,
                AuthenticationService,
                UserAccountsService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PortfolioManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
