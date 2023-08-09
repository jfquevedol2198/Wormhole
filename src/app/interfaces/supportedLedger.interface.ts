import { IBaseResponse } from './common.interface';

export interface ISupportedLedgerResponse extends IBaseResponse {
    records: string[];
}
