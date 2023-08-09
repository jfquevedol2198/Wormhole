import { IChip } from './healthCheck.interface';
import { IPaginationParams } from './paginationParams.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface INotificationFromResponse {
    notificationId: number;
    ledgerAccountId: number;
    createdDate: string;
    recheckedDate: string;
    severity: string;
    type: string;
    message: string;
    details: string;
    scope: string;
    hidden: boolean;
    dismissed: boolean;
    userNote: string;
}

export interface INotification extends INotificationFromResponse {
    isNotificationSelected: boolean;
    chips: IChip[];
    workerName: string;
}

export interface INotificationsData {
    pageIndex: number;
    pageSize: number;
    total: number;
    data: INotification[];
    sorting: string[];
    filters: INotificationsFilters;
}

export interface ICombinedNotificationsData {
    paginationParams: IPaginationParams;
    sorting: string[];
    data?: INotification[];
    recordCount?: number;
    filters: INotificationsFilters;
}

export interface INotificationsResponse extends IWormholeBaseResponse {
    records: INotificationFromResponse[];
}

export interface INotificationsFilters {
    fromDate?: string;
    toDate?: string;
    severity?: string;
    type?: string;
}

export interface INotificationActionDetails {
    details: any;
    type: string;
}

export interface INotificationsModifiedRequest {
    notificationIds: number[];
    hide?: boolean;
    userNote?: string;
    dismissed?: boolean;
}
