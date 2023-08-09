import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';

import { PnlSummaryComponent } from './pnl-summary.component';
import { GeneralLedgerService } from '../general-ledger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';

describe('PnlSummaryComponent', async () => {
    let fixture: ComponentFixture<PnlSummaryComponent>;
    let component: PnlSummaryComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [PnlSummaryComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    DataQualityCheckService,
                    GeneralLedgerService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PnlSummaryComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
