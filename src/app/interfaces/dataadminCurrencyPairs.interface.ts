import { IBaseResponse } from './common.interface';

export interface IDataAdminCurrencyPair {
    status: string,
    rateCount: number,
    exchangeRatePairId: number,
    pairName: string,
    baseTokenContractAddress: string,
    tokenContractAddress: string,
    firstSeenBlockNumber: number,
    firstSeenTimestamp: string,
    lastSeenBlockNumber: number,
    lastSeenTimestamp: string,
    tokenDependency: string,
    requested: boolean,
    active: boolean,
    syncedBlockNumber: number,
    syncedTimestamp: string,
    verifiedBlockNumber: number,
    verifiedTimestamp: string,
    rateSource: string
}

export interface IDataAdminCurrencyPairResponse extends IBaseResponse {
    missingCurrencyPairs: IDataAdminCurrencyPair[]
}

// export interface IDataAdminCurrencyPair extends IDataAdminCurrencyPair {
//     action: string
// }

export interface IDataAdminCurrencyPairData {
    data: IDataAdminCurrencyPair[]
}


