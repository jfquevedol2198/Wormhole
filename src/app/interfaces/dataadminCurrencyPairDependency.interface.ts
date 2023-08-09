import { IBaseResponse, ITokenDependency } from './common.interface';

export interface IDataAdminCurrencyPairDependency {
    exchangeRatePairId: number,
    exchangeRateProviderId: number,
    name: string,
    baseTokenContractAddress: string,
    tokenContractAddress: string,
    pairParameters: string,
    tokenDependency: ITokenDependency[],
    requested: boolean,
    active: boolean,
    syncedBlockNumber: number,
    rateSource: string
}

export interface IDataAdminCurrencyPairDependencyResponse extends IBaseResponse {
    pairsDependencies: IDataAdminCurrencyPairDependency[]
}

export interface IDataAdminCurrencyPairDependencyData {
    data: IDataAdminCurrencyPairDependency[]
}


