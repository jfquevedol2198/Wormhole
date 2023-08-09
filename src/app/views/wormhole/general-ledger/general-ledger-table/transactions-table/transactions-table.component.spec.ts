import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../../services/api/api.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { ConfigurationService } from '../../../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../../../services/dataQualityCheck/dataQualityCheck.service';
import { UserAccountsService } from '../../../../../services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from '../../general-ledger.service';
import { TransactionsTableComponent } from './transactions-table.component';

describe('TransactionsTableComponent', async () => {
    let fixture: ComponentFixture<TransactionsTableComponent>;
    let component: TransactionsTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [TransactionsTableComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    DataQualityCheckService,
                    GeneralLedgerService,
                    AuthenticationService,
                    UserAccountsService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
