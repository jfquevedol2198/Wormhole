import * as moment from 'moment';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { AuditService } from './audit.service';

const OPERATIONAUDITS = require('../../../mocks/transactions.json');

describe('AuditService', () => {
    let service: AuditService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    AuditService,
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

        service = TestBed.get(AuditService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on GetOperationAudits to get list of operation audits', () => {
        const transactionId = 1;

        service.getOperationAudits(transactionId).subscribe((result) =>
            expect(result).toEqual(
                OPERATIONAUDITS.records.map((record) => {
                    return {
                        ...record,
                        date: moment.utc(record.timestamp).local(),
                    };
                }),
            ),
        );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetOperationAudits?PageIndex=1&PageSize=10000000&TransactionId=${transactionId}&GetRecords=true`,
                ),
            )
            .flush(OPERATIONAUDITS);
    });
});
