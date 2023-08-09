import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { MarketDataService } from './market-data.service';

const EXCHANGERATEPROVIDERS = require('../../../mocks/exchangeRateProvider.json');

describe('MarketDataService', () => {
    let service: MarketDataService;
    let httpMock: HttpTestingController;
    let configuration: ConfigurationService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    MarketDataService,
                    ApiService,
                    {
                        provide: ConfigurationService,
                        useClass: ConfigurationServiceMock,
                    },
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(MarketDataService);
        configuration = TestBed.get(ConfigurationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on GetExchangeRateProviders to get exchange rate providers', () => {
        service
            .getExchangeRateProviders()
            .subscribe((result) =>
                expect(result).toEqual(EXCHANGERATEPROVIDERS.records),
            );

        httpMock
            .expectOne((req) => req.url.endsWith(`/GetExchangeRateProviders`))
            .flush(EXCHANGERATEPROVIDERS);
    });
});
