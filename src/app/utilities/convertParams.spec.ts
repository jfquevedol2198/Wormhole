import { convertParamsForRequests } from './convertParams';

describe('Convert Params For Request Utility', () => {
    const parameters = {
        portfolioId: 1,
        fromDate: new Date(),
        toDate: new Date(),
        paginationParams: {
            pageIndex: 1,
            pageSize: 1,
        },
        transactionId: 1,
        walletAddress: 'address',
        exchangeRatePairId: 1,
    };

    const convertedParams = [
        {
            name: 'PortfolioId',
            value: parameters.portfolioId,
        },
        {
            name: 'FromDate',
            value: new Date(parameters.fromDate).getTime() / 1000,
        },
        {
            name: 'ToDate',
            value: new Date(parameters.toDate).getTime() / 1000,
        },
        {
            name: 'PageIndex',
            value: parameters.paginationParams.pageIndex + 1, // The wormhole API accepts pageIndex from 1, not from 0 as matPaginator
        },
        {
            name: 'PageSize',
            value: parameters.paginationParams.pageSize,
        },
        {
            name: 'TransactionId',
            value: parameters.transactionId,
        },
        {
            name: 'WalletAddress',
            value: parameters.walletAddress,
        },
        {
            name: 'ExchangeRatePairId',
            value: parameters.exchangeRatePairId,
        },
    ];

    it('should convert params for requests', () => {
        expect(convertParamsForRequests(parameters)).toEqual(convertedParams);
    });
});
