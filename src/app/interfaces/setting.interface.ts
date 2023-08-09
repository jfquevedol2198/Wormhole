import { IWormholeBaseResponse } from './response.interface';
import { IUserAccount } from './userAccount.interface';

export enum IUserRoles {
    ROLE_USER_DATA_VALIDATOR = 'DataValidator',
    ROLE_USER_PORTFOLIO_MANAGER = 'PortfolioManager',
    ROLE_USER_DATA_ADMIN = 'DataAdmin',
    ROLE_USER_ADMINISTRATOR = 'Administrator',
}

export interface IUser {
    role: IUserRoles;
}

export interface ISetting {
    userAccountId: number;
    account: IUserAccount;
    group: string;
    key: string;
    subKey: string;
    value: string;
    description: string;
}

export interface IUpdateSettingFields {
    userAccountId?: number;
    agentId?: number;
    group?: string;
    key?: string;
    subKey?: string;
    value: string;
}

export interface ISettingsResponse extends IWormholeBaseResponse {
    records: ISetting[];
}
