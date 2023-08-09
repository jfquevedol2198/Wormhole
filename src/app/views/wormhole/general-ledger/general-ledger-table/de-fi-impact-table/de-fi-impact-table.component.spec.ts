import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../../services/api/api.service';
import { ConfigurationService } from '../../../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerService } from '../../general-ledger.service';
import { DeFiImpactTableComponent } from './de-fi-impact-table.component';

describe('DeFiImpactTableComponent', async () => {
    let fixture: ComponentFixture<DeFiImpactTableComponent>;
    let component: DeFiImpactTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [DeFiImpactTableComponent],
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
        fixture = TestBed.createComponent(DeFiImpactTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
