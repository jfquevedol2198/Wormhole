import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';

describe('PieChartComponent', async () => {
    let fixture: ComponentFixture<PieChartComponent>;
    let component: PieChartComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [PieChartComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    GeneralLedgerService,
                    DataQualityCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PieChartComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
