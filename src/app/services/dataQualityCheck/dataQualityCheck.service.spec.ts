import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { DataQualityCheckService } from './dataQualityCheck.service';

const PNLPRICEMOVEMENTS = require('../../../mocks/pnlPriceMovements.json');

describe('DataQualityCheckService', () => {
    let service: DataQualityCheckService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    DataQualityCheckService,
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

        service = TestBed.get(DataQualityCheckService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on IdentifyPnlPriceMovements to get PNL price movements', () => {
        const portfolioId = 1;
        const date = new Date();
        const paginationParams = { pageSize: 50, pageIndex: 0 };
        const sorting = ['assetName asc'];
        const sortingBy = 'usd';
        service
            .getPNLPriceMovements(
                portfolioId,
                date,
                paginationParams,
                sorting,
                sortingBy,
            )
            .subscribe((result) =>
                expect(result).toEqual({
                    portfolioId,
                    date,
                    paginationParams,
                    data: PNLPRICEMOVEMENTS.records.map((record) => ({
                        ...record,
                        isExpanded: false,
                    })),
                    recordCount: 1,
                    sorting,
                    sortingBy,
                }),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/IdentifyPnlPriceMovements?PortfolioId=1&Date=${
                        date.getTime() / 1000
                    }&PageIndex=1&PageSize=50&GetRecordCount=true&GetRecords=true&Sorting=assetName asc`,
                ),
            )
            .flush(PNLPRICEMOVEMENTS);
    });
});
