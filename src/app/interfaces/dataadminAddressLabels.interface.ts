import { IBaseResponse } from './common.interface';
export interface IDataAdminAddressLabel {
    addressLabelId: number;
    platformName: string;
    name: string;
    address: string;
    addressType: string;
    assetName: string;
    assetSymbol: string;
    assetDecimals: number;
    assetUri: string;
    ledgerName: string;
    tokenId: string;
    score: number;
    scam: boolean;
}
export interface IDataAdminAddressLabelResponse extends IBaseResponse {
    records: IDataAdminAddressLabel[];
}

export interface IDataAdminAddressLabel extends IDataAdminAddressLabelResponse {
    action: string
}

export interface IDataAdminAddressLabelData {
    data: IDataAdminAddressLabel[]
}
