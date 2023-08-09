import { IWormholeBaseResponse } from './response.interface';
import { ITreatmentWithIcon } from './transaction.interface';

export interface IOperationFromResponse {
    transactionId: number;
    operationId: number;
    ledgerName: string;
    sequenceNumber: number;
    value: number;
    usdValue: number;
    assetAddress: string;
    assetName: string;
    assetTokenId: string;
    assetLogoUri: string;
    fromAddress: string;
    fromAddressLabel: string;
    toAddress: string;
    toAddressLabel: string;
    sent: boolean;
    received: boolean;
    supply: boolean;
    stake: boolean;
    collateral: boolean;
    borrow: boolean;
    liquidation: boolean;
    funding: boolean;
    reward: boolean;
    internalTransfer: boolean;
    fee: boolean;
    change: boolean;
    swap: boolean;
    enabled: boolean;
    isLatest: boolean;
    manual: boolean;
    previousVersion: number;
}

export type OperationStatus = 'Original' | 'Manual' | 'Overlay';

export interface IOperationsStatusWithIcon {
    status: OperationStatus;
    icon: string;
}

export interface IOperation extends IOperationFromResponse {
    isOperationSelected?: boolean;
    treatmentWithIcons?: ITreatmentWithIcon[];
    expandOverlay?: boolean;
    statusWithIcon?: IOperationsStatusWithIcon;
}

export interface IOperationResponse extends IWormholeBaseResponse {
    records: IOperationFromResponse[];
}

export interface IRemoveOperationResponse {
    operationId: number;
}

export interface IOperationFormMainData {
    fromAddress: string;
    toAddress: string;
    amount: string;
    ledgerName: string;
    assetAddress: string;
    tokenId?: string;
}

export interface IOperationFormData extends IOperationFormMainData {
    flags: string[];
}

export interface IOperationRequestData extends IOperationFormMainData {
    sent?: boolean;
    supply?: boolean;
    stake?: boolean;
    collateral?: boolean;
    borrow?: boolean;
    liquidation?: boolean;
    funding?: boolean;
    reward?: boolean;
    fee?: boolean;
    change?: boolean;
    swap?: boolean;
}

export interface IAddOperationRequestData extends IOperationRequestData {
    transactionId: number;
}

export interface IModifyOperationRequestData extends IOperationRequestData {
    operationId: number;
}

export interface IOperationFlag {
    name: string;
    columnName: string;
}

export interface IOverlay {
    name: string;
    originalValue: string;
    overlayValue: string;
    blockchainValue: string;
}

export interface INewOverlayData {
    data: string[];
    property: string;
}
