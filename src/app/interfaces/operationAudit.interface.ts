import { Moment } from 'moment';

import { IWormholeBaseResponse } from './response.interface';

export interface IOperationAuditFromResponse {
    auditId: number;
    userAccountName: string;
    operationId: number;
    transactionId: number;
    timestamp: string;
    entityState: string;
    message: string;
}

export interface IOperationAudit extends IOperationAuditFromResponse {
    date: Moment;
}

export interface IOperationAuditsResponse extends IWormholeBaseResponse {
    records: IOperationAuditFromResponse[];
}
