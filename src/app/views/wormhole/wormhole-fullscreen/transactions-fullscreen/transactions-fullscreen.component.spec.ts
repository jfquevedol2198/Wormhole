import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { AdvancedSearchService } from '../../../../services/advanced-search/advanced-search.service';
import { ApiService } from '../../../../services/api/api.service';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';
import { UserAccountsService } from '../../../../services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';
import { TransactionsFullscreenComponent } from './transactions-fullscreen.component';

describe('TransactionsFullscreenComponent', async () => {
    let fixture: ComponentFixture<TransactionsFullscreenComponent>;
    let component: TransactionsFullscreenComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
            ],
            declarations: [TransactionsFullscreenComponent],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                DataQualityCheckService,
                GeneralLedgerService,
                AdvancedSearchService,
                AuthenticationService,
                UserAccountsService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsFullscreenComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
