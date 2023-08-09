import { IBaseResponse } from './common.interface';
export interface IDataAdminPlatform {
    platformId: number;
    name: string;
    score: number;
    scam: boolean;
    platformIcon: string;
    ledgerName: string;
}
export interface IDataAdminPlatformResponse extends IBaseResponse {
    records: IDataAdminPlatform[];
}

// export interface IDataAdminPlatform extends IDataAdminPlatformResponse {
//     action: string;
// }

export interface IDataAdminPlatformData {
    data: IDataAdminPlatform[];
}
