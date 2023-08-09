import { IWormholeBaseResponse } from './response.interface';

export interface IProvider {
    name: string;
    ledgerName: string;
    platformId: number;
    providerParameters: string;
}

export interface IProvidersResponse extends IWormholeBaseResponse {
    records: IProvider[];
}
