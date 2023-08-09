import { IWormholeBaseResponse } from './response.interface';

export interface IAccountDataSummary {
    priority: number;
    category: string;
    syncBlockNumber: number;
    syncTimestamp: string;
    syncPercentage: number;
}

export interface IAccountPNLProgressData {
    syncTimestamp: string;
    syncPercentage: number;
    ledgerAccountId: number;
}

export interface IAccountDataSummaryResponse extends IWormholeBaseResponse {
    records: IAccountDataSummary[];
}
