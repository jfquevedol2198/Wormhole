import * as moment from 'moment';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { SubLedgersService } from './sub-ledgers.service';

const BLOCKCHAIN_MESSAGES = require('../../../mocks/blockchainMessages.json');

describe('BlockchainMessages', () => {
    let service: SubLedgersService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    SubLedgersService,
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

        service = TestBed.get(SubLedgersService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on getBlockchainMessages to get list of all messages', () => {
        const paginationParams = {
            pageIndex: 1,
            pageSize: 10,
        };
        const sorting = ['timestamp asc'];
        const range = {
            left: new Date(),
            right: new Date(),
        };
        const blockNumberRange = {
            left: 100,
            right: 100,
        };

        const portfolioId = 1;

        service
            .getBlockchainMessages(
                portfolioId,
                range,
                paginationParams,
                sorting,
                blockNumberRange,
            )
            .subscribe((result) =>
                expect(result).toEqual({
                    portfolioId,
                    paginationParams,
                    data: BLOCKCHAIN_MESSAGES.records.map((record) => {
                        return {
                            ...record,
                            date: moment.utc(record.timestamp).local(),
                        };
                    }),
                    total: BLOCKCHAIN_MESSAGES.recordCount,
                    sorting,
                    range,
                    blockNumberRange,
                }),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetBlockchainMessages?PortfolioId=1&PageIndex=2&PageSize=10&GetRecordCount=true&GetRecords=true&Sorting=timestamp asc&StartBlock=100&EndBlock=100`,
                ),
            )
            .flush(BLOCKCHAIN_MESSAGES);
    });
});
