import { IBaseResponse } from './common.interface';

export interface IDataAdminCurrencyPairSummary {
    syncedToDate: string;
    verifiedToDate: string;
    provider: string;
    pair: string;
    exchangeRatePairId: number;
    active: boolean;
    requested: boolean;
    rateSource: string;
    latestExchangeRate: number;
    lowestRate: number;
    highestRate: number;
    allRates: number;
    nullRates: number;
    verifiedBlockNumber: number;
    syncedBlockNumber: number;
    processedBlockNumber: number;
    baseTokenContractAddress: string;
    tokenContractAddress: string;
}

export interface IDataAdminCurrencyPairSummaryResponse extends IBaseResponse {
    exchangePairs: IDataAdminCurrencyPairSummary[]
}

export interface IDataAdminCurrencyPairSummaryData {
    data: IDataAdminCurrencyPairSummary[]
}
