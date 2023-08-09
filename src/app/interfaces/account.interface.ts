import { IWormholeBaseResponse } from './response.interface';

export interface ILedgerAccount extends IBasicLedgerAccountData {
    ledgerAccountId: number;
    portfolioIds: number[];
    syncedPoint: number;
    watchedAccount: boolean;
    state: string;
    iconUrl?: string;
    remainingTime?: string;
    estimatedEndDate?: string;
    syncedTimestamp?: string;
    syncedPercentage?: number;
}

export interface IBasicLedgerAccountData {
    ledgerAddress: string;
    ledgerName: string;
    description?: string;
}

export interface ILedgerAccountsResponse extends IWormholeBaseResponse {
    records: ILedgerAccount[];
}
