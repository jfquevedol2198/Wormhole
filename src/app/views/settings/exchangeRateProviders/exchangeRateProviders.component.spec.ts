import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { MarketDataService } from '../../../services/market-data/market-data.service';
import { ExchangeRateProvidersComponent } from './exchangeRateProviders.component';

describe('ExchangeRateProvidersComponent', async () => {
    let fixture: ComponentFixture<ExchangeRateProvidersComponent>;
    let component: ExchangeRateProvidersComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MatCardModule,
                    DatePipeModule,
                    MatChipsModule,
                ],
                declarations: [ExchangeRateProvidersComponent],
                providers: [
                    ApiService,
                    ConfigurationService,
                    MarketDataService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeRateProvidersComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
