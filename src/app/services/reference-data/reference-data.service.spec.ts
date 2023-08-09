import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { ReferenceDataService } from './reference-data.service';

const SUPPORTEDLEDGERS = require('../../../mocks/supportedLedgers.json');

describe('ReferenceDataService', () => {
    let service: ReferenceDataService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    ReferenceDataService,
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

        service = TestBed.get(ReferenceDataService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on GetBlockchain to get list of blockchains', () => {
        service
            .getSupportedLedgers()
            .subscribe((result) =>
                expect(result).toEqual(SUPPORTEDLEDGERS.records),
            );

        httpMock
            .expectOne((req) => req.url.endsWith('/GetSupportedLedgers'))
            .flush(SUPPORTEDLEDGERS);
    });
});
