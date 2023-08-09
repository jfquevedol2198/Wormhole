import { ILedgerAccount, IBasicLedgerAccountData } from './account.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface IPortfolioFromResponse {
    portfolioId: number;
    name: string;
    description: string;
    ledgerAccounts: ILedgerAccount[];
}

export interface IPortfolio extends IPortfolioFromResponse {
    isSelected: boolean;
    ledgersCount: number;
    addressesCount: number;
}

export interface IPortfolioResponse extends IWormholeBaseResponse {
    records: IPortfolioFromResponse[];
}

export interface IRemovePortfolioResponse {
    portfolioId: number;
}

export interface IAddPortfolioParams {
    name: string;
    description?: string;
    ledgerAccounts?: IBasicLedgerAccountData[];
}

export interface IModifyPortfolioParams {
    portfolioId: number;
    name?: string;
    description?: string;
    accountsToAdd?: IBasicLedgerAccountData[];
    accountsToRemove?: IBasicLedgerAccountData[];
}
