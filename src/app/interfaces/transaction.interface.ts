import { Moment } from 'moment';

import { IAddressLabel } from './addressLabel.interface';
import { IOperation } from './operation.interface';
import { IPaginationParams } from './paginationParams.interface';
import { IRange } from './range.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface ITransactionFromResponse {
    portfolio: string;
    ledgerAddress: string;
    platform: string;
    platformLogoUri: string;
    transactionHash: string;
    transactionId: number;
    transactionType: string;
    timestamp: string;
    blockNumber: number;
    isError: boolean;
    description: string;
    processingStage: string;
    fromAddress: string;
    toAddress: string;
    methodId: string;
    methodSignature: string;
    methodDescription: string;
    transactionTreatment: string;
    transactionFee: number;
    gas: number;
    gasUsed: number;
    gasPrice: number;
    usdValue: number;
    ethValue: number;
    fromAddressLabel: IAddressLabel;
    toAddressLabel: IAddressLabel;
    source: string;
    enabled: boolean;
    edited: boolean;
}

export interface ITransaction extends ITransactionFromResponse {
    date: Moment;
    treatmentWithIcons: ITreatmentWithIcon[];
    isExpanded: boolean;
    operations?: IOperation[];
}

export interface ITreatmentWithIcon {
    name: string;
    icon: string;
}

export interface ITransactionData {
    data: ITransaction[];
    pageIndex: number;
    pageSize: number;
    isEditMode: boolean;
    total: number;
    reportPresetId?: number;
}

export interface ITransactionsResponse extends IWormholeBaseResponse {
    records: ITransactionFromResponse[];
}

export interface IBlockNumberRange {
    left?: number;
    right?: number;
}

export interface ICombinedTransactions {
    portfolioId: number;
    range: IRange;
    paginationParams: IPaginationParams;
    isEditMode: boolean;
    transactions?: ITransaction[];
    recordCount?: number;
    blockNumberRange?: IBlockNumberRange;
    sorting?: string[];
    reportPresetId?: number;
}
