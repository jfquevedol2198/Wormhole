import { IBaseResponse } from './common.interface';
export interface IDataAdminCurrencyPairMarketToMarket {
    pairName?: string;
    baseTokenContractAddress: string;
    tokenContractAddress: string;
    fixedExchangeRate: string | number;
    firstSeen?: string | Date;
    lastSeen?: string | Date;
    active?: boolean;
    requested?: boolean;
}
export interface IDataAdminCurrencyPairMarketToMarketResponse extends IBaseResponse {
    marketToMarketExchangePairs: IDataAdminCurrencyPairMarketToMarket[];
}

// export interface IDataAdminCurrencyPairMarketToMarket
//     extends IDataAdminCurrencyPairMarketToMarketbResponse {
//     action: string;
// }

export interface IDataAdminCurrencyPairMarketToMarketData {
    data: IDataAdminCurrencyPairMarketToMarket[];
}
