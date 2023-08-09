import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AccountingService } from '../accounting/accounting.service';
import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { HealthCheckService } from './healthCheck.service';

const PORTFOLIOSDATA = require('../../../mocks/portfolios.json');

describe('HealthCheckService', () => {
    let service: HealthCheckService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    AccountingService,
                    ApiService,
                    {
                        provide: ConfigurationService,
                        useClass: ConfigurationServiceMock,
                    },
                    HealthCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(HealthCheckService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();

        httpMock
            .expectOne((req) =>
                req.url.endsWith('/GetPortfolios?GetRecords=true'),
            )
            .flush(PORTFOLIOSDATA);
    });
});
