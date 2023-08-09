import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerService } from '../general-ledger/general-ledger.service';
import { SubLedgersComponent } from './sub-ledgers.component';

describe('SubLedgersComponent', async () => {
    let fixture: ComponentFixture<SubLedgersComponent>;
    let component: SubLedgersComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [SubLedgersComponent],
                providers: [
                    GeneralLedgerService,
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    DataQualityCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SubLedgersComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
