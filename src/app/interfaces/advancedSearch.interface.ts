import { IWormholeBaseResponse } from './response.interface';
import { IUserAccount } from './userAccount.interface';

export interface IPreset {
    reportPresetId: number;
    createdDate: string;
    name: string;
    persistence: IPersistence;
    scope: string;
    userAccountId: number;
    userAccount?: IUserAccount;
    definition: IPresetDefinition;
    isActive?: boolean;
}
export interface IPresetDefinition {
    startBlock?: number;
    endBlock?: number;
    source?: string;
    platform?: string;
    fromValue?: string;
    toValue?: string;
    isUsdValue?: boolean;
    isEdited?: boolean;
    isDisabled?: boolean;
    asset?: string;
    isError?: boolean;
    methodId?: string;
    methodDescription?: string;
    fromDate?: Date;
    toDate?: Date;
    transactionTreatment?: number;
    presetName?: string;
}

export interface IPresetForm {
    presetName?: string;
    blockStartHeight?: number;
    blockEndHeight?: number;
    platform?: string;
    fromValue?: string;
    currency?: string;
    toValue?: string;
    isError?: boolean;
    methodId?: string;
    methodDescription?: string;
    methodProcessing?: any;
    startBy?: string;
    endBy?: string;
    fromDate?: Date;
    toDate?: Date;
    source?: string;
    isEdited?: boolean;
    isDisabled?: boolean;
    asset?: string;
}

export interface IAdvancedSearchParams {
    isToBeSelected?: boolean;
}

export interface IReportPresetRequest {
    UserAccountId: number;
    Persistence: IPersistence;
    Name: string;
    Scope: IScope;
}

export type IPersistence = 'Single' | 'Persistent' | 'Transient';

export type IScope = 'None' | 'User' | 'Global' | 'Group';
export interface IReportPresetResponse extends IWormholeBaseResponse {
    records: IPreset[];
}

export enum IMethodProcessingEnum {
    None = 0,
    Events = 1,
    DepositWithCollateral = 2,
    WithdrawalWithCollateral = 4,
    Borrow = 8,
    Repay = 16,
    ClaimReward = 32,
    Swap = 64,
    Liquidation = 128,
    Funding = 256,
    Stake = 512,
    Unstake = 1024,
}
