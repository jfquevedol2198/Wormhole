import { ILedgerAccount } from './account.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface ILedgerData {
    name: string;
    ledgerAccounts?: ILedgerAccount[];
    isExpanded?: boolean;
    title?: string;
}

export interface IGetBlockchainResponse extends IWormholeBaseResponse {
    records: string[];
}
