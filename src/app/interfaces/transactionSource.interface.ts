import { IWormholeBaseResponse } from './response.interface';

export interface ITransactionSourceResponse extends IWormholeBaseResponse {
    records: string[];
}
