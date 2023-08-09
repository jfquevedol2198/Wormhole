import { IBaseResponse, ITokenDependency } from './common.interface';

export interface IDataAdminCurrencyPairUsage {
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

export interface IDataAdminCurrencyPairUsageResponse extends IBaseResponse {
    dependentPairs: IDataAdminCurrencyPairUsage[]
}

export interface IDataAdminCurrencyPairUsageData {
    data: IDataAdminCurrencyPairUsage[]
}
