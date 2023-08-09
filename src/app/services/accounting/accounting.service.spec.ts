import makeBlockie from 'ethereum-blockies-base64';
import * as moment from 'moment';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { IPNLPositionDetails } from '../../interfaces/pnlPosition.interface';
import { hasPositionData } from '../../utilities/hasPositionData';
import { removeAddress } from '../../utilities/removeAddress';
import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { AccountingService } from './accounting.service';

const TRANSACTIONSDATA = require('../../../mocks/transactions.json');
const PNLDATA = require('../../../mocks/pnl.json');
const PNLDETAILSDATA = require('../../../mocks/pnlDetails.json');
const OPERATIONSRESPONSE = require('../../../mocks/operationsResponse.json');
const OPERATIONS = require('../../../mocks/operations.json');
const OPERATIONREQUESTDATA = require('../../../mocks/operationRequestData.json');
const REPORTMESSAGESDATA = require('../../../mocks/reportMessages.json');
const PORTFOLIOSDATA = require('../../../mocks/portfolios.json');
const TRADERSTAMINADATA = require('../../../mocks/traderStaminaData.json');

describe('AccountingService', () => {
    let service: AccountingService;
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
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(AccountingService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on GetTransactions to get list of transactions', () => {
        const portfolioId = 1;
        const range = {
            left: new Date(),
            right: new Date(),
        };
        const paginationParams = {
            pageIndex: 1,
            pageSize: 10,
        };
        const isEditMode = true;
        const blockNumberRange = {
            left: 100,
            right: 100,
        };
        const sorting = ['timestamp asc'];
        const reportPresetId = 10;

        service
            .getTransactions(
                portfolioId,
                range,
                paginationParams,
                isEditMode,
                blockNumberRange,
                sorting,
                reportPresetId,
            )
            .subscribe((result) =>
                expect(result).toEqual({
                    portfolioId,
                    range,
                    paginationParams,
                    isEditMode,
                    blockNumberRange,
                    transactions: TRANSACTIONSDATA.records.map((record) => {
                        return {
                            ...record,
                            date: moment.utc(record.timestamp).local(),
                            treatmentWithIcons: [
                                {
                                    name: 'string',
                                    icon: 'error_outline',
                                },
                            ],
                        };
                    }),
                    recordCount: TRANSACTIONSDATA.recordCount,
                    sorting,
                    reportPresetId,
                }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/GetTransactions`),
        );

        expect(request.request.method).toEqual('POST');
        request.flush(TRANSACTIONSDATA);
    });

    it('should call GET on GetProfitAndLoss to get list of all PnL', () => {
        const portfolioId = 1;
        service.getProfitAndLoss(portfolioId).subscribe((result) =>
            expect(result).toEqual(
                PNLDATA.records.map((position) => ({
                    ...position,
                    date: moment(position.timestamp),
                })),
            ),
        );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetProfitAndLoss?PortfolioId=${portfolioId}&PageIndex=1&PageSize=10000000&GetRecords=true`,
                ),
            )
            .flush(PNLDATA);
    });

    it('should call GET on GetProfitAndLoss with filter parameters to get a filtered list of PnL', () => {
        const portfolioId = 1;
        const fromDate = new Date();
        const toDate = new Date();

        service
            .getProfitAndLoss(portfolioId, fromDate, toDate)
            .subscribe((result) =>
                expect(result).toEqual(
                    PNLDATA.records.map((position) => ({
                        ...position,
                        date: moment(position.timestamp),
                    })),
                ),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetProfitAndLoss?PortfolioId=${portfolioId}&FromDate=${
                        fromDate.getTime() / 1000
                    }&ToDate=${
                        toDate.getTime() / 1000
                    }&PageIndex=1&PageSize=10000000&GetRecords=true`,
                ),
            )
            .flush(PNLDATA);
    });

    it('should call GET on GetProfitAndLossDetails to get PnL details for selected date', () => {
        const portfolioId = 1;
        const fromToDate = moment();

        service
            .getProfitAndLossDetails(portfolioId, fromToDate)
            .subscribe((result) =>
                expect(result).toEqual(
                    PNLDETAILSDATA.records
                        .map((position) => ({
                            ...position,
                            date: new Date(position.timestamp),
                            assetName: removeAddress(position.assetName),
                            assetSymbol: removeAddress(position.assetSymbol),
                        }))
                        .filter((position: IPNLPositionDetails) =>
                            hasPositionData(position),
                        ),
                ),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetProfitAndLossDetail?PortfolioId=${portfolioId}&FromDate=${fromToDate.unix()}&ToDate=${fromToDate.unix()}&PageIndex=1&PageSize=10000000`,
                ),
            )
            .flush(PNLDETAILSDATA);
    });

    it('should call GET on GetOperations to get list of all operations', () => {
        const transactionId = 1;

        service
            .getOperations(transactionId)
            .subscribe((result) => expect(result).toEqual(OPERATIONS));

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetOperations?PageIndex=1&PageSize=100&TransactionId=${transactionId}&GetRecords=true`,
                ),
            )
            .flush(OPERATIONSRESPONSE);
    });

    it('should call POST on AddOperation to add new operation', () => {
        const params = {
            ...OPERATIONREQUESTDATA,
            transactionId: 1,
        };

        service
            .addOperation(params)
            .subscribe((result) =>
                expect(result).toEqual({ id: 1, message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/AddOperation`),
        );

        expect(request.request.method).toEqual('POST');
        request.flush({ id: 1, message: 'string' });
    });

    it('should call PUT on ModifyOperation to modify operation', () => {
        const params = {
            ...OPERATIONREQUESTDATA,
            operationId: 1,
        };

        service
            .modifyOperation(params)
            .subscribe((result) =>
                expect(result).toEqual({ message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/ModifyOperation`),
        );

        expect(request.request.method).toEqual('PUT');

        request.flush({ message: 'string' });
    });

    it('should call GET on GetPortfolios to get list of all portfolios', () => {
        service.getPortfolios().subscribe((result) =>
            expect(result).toEqual(
                PORTFOLIOSDATA.portfoliosWithoutParams.records.map((record) => {
                    return {
                        ...record,
                        ledgerAccounts: record.ledgerAccounts.map(
                            (account) => ({
                                ...account,
                                iconUrl: makeBlockie(account.ledgerAddress),
                            }),
                        ),
                    };
                }),
            ),
        );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(`/GetPortfolios?GetRecords=true`),
            )
            .flush(PORTFOLIOSDATA.portfoliosWithoutParams);
    });

    it('should call POST on AddPortfolio to add new portfolio', () => {
        const params = {
            name: 'Name',
            description: 'Description',
        };

        service
            .addPortfolio(params)
            .subscribe((result) =>
                expect(result).toEqual({ id: 1, message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/AddPortfolio`),
        );

        expect(request.request.method).toEqual('POST');
        request.flush({ id: 1, message: 'string' });
    });

    it('should call PUT on ModifyPortfolio to modify portfolio', () => {
        const accounts =
            PORTFOLIOSDATA.portfoliosWithoutParams.records[0].accounts;
        const params = {
            portfolioId: 1,
            name: 'Name',
            description: 'Description',
            accountsToAdd: accounts,
            accountsToRemove: accounts,
        };

        service
            .modifyPortfolio(params)
            .subscribe((result) =>
                expect(result).toEqual({ message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/ModifyPortfolio`),
        );

        expect(request.request.method).toEqual('PUT');

        request.flush({ message: 'string' });
    });

    it('should call DELETE on RemovePortfolio to remove portfolio', () => {
        const portfolioId = 1;

        service
            .removePortfolio(portfolioId)
            .subscribe((result) => expect(result).toEqual({ portfolioId }));

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/RemovePortfolio`),
        );

        expect(request.request.method).toEqual('DELETE');

        request.flush({ portfolioId });
    });

    it('should get trader stamina', () => {
        const portfolioId = 1;

        service
            .getTraderStamina(portfolioId)
            .subscribe((result) =>
                expect(result).toEqual(TRADERSTAMINADATA.records),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `/GetTraderStamina?PortfolioId=${portfolioId}&PageIndex=1&PageSize=10000000`,
                ),
            )
            .flush(TRADERSTAMINADATA);
    });
});
