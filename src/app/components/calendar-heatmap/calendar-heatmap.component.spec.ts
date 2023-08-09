import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarHeatmapComponent } from './calendar-heatmap.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountingService } from '../../services/accounting/accounting.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { ApiService } from '../../services/api/api.service';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';

describe('CalendarHeatmapComponent', async () => {
    let fixture: ComponentFixture<CalendarHeatmapComponent>;
    let component: CalendarHeatmapComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [CalendarHeatmapComponent],
                providers: [
                    AccountingService,
                    ConfigurationService,
                    ApiService,
                    DataQualityCheckService,
                    GeneralLedgerService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarHeatmapComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
