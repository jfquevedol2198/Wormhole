import { IColumn } from './column.interface';
import { IPaginationParams } from './paginationParams.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface IAgent {
    agentId: number;
    name: string;
    guid: string;
    enabled: boolean;
    lastSeen: string;
}
export interface ITaskParameters {
    startBlockNumber: number;
    endBlockNumber: number;
}
export interface IProcessingJob {
    workerTaskId: number;
    taskType: string;
    workerName: string;
    taskScheduled: string;
    taskStarted: string;
    taskCompleted: string;
    state: string;
    taskParameters: ITaskParameters;
    lockTimestamp: string;
    agent: IAgent;
    sessionId: string;
    runCounter: number;
    enabled: boolean;
}

export interface IProcessingJobsReponse extends IWormholeBaseResponse {
    records: IProcessingJob[];
}

export interface ICombinedProcessingJobsData {
    paginationParams: IPaginationParams;
    sorting: string[];
    data?: IProcessingJob[];
    recordCount?: number;
    filters: IProcessingJobsFilters;
}

export interface IProcessingJobsFilters {
    sessionId: string;
    instanceName: string;
    taskStates: string;
    enabled: boolean;
    workerTaskIds: number;
}
export interface IProcessingJobsColumn extends IColumn {
    columnType: string;
    isSortable: boolean;
    cell?(processingProfitAndLoss: IProcessingJob): string;
}

export interface IProfitAndLossSchedule {
    profitAndLossScheduleId: number;
    portfolioId: number;
    pricingCurveId: number;
    pricingCurveName: string;
    schedule: string;
    accountingModels: string;
    firstScheduleDate: string;
    lastScheduleDate: string;
    createdDate: string;
}
export interface IProfitAndLossScheduleResponse extends IWormholeBaseResponse {
    records: IProfitAndLossSchedule[];
}

export interface IProfitAndLossDefinition {
    profitAndLossDefinitionId: number;
    profitAndLossScheduleId: number;
    periodStartDate: string;
    periodEndDate: string;
    draft: boolean;
    published: boolean;
    progress: number;
    priority: number;
    integrity: boolean;
    reference: string;
    issues: string;
    createdDate: string;
    update: boolean;
    workerTaskId: number;
}
export interface IProfitAndLossDefinitionResponse
    extends IWormholeBaseResponse {
    records: IProfitAndLossDefinition[];
}

export interface IAddProfitAndLossDefinition {
    profitAndLossScheduleId: number;
    periodStartDate: number;
    periodEndDate: number;
}
export interface IModifyProfitAndLossDefinition {
    profitAndLossDefinitionId: number;
    draft?: boolean;
    published?: boolean;
    priority?: number;
    update?: boolean;
}

export interface IAddProfitAndLossScheduleResponse {
    message: string;
}
export interface IAddProfitAndLossSchedule {
    userAccountId: number;
    portfolioId: number;
    pricingCurveId: number;
    schedule: string;
    accountingModels:
    | 'None'
    | 'DollarBased'
    | 'TokenBased'
    | 'TokenBased, DollarBased';
}
export interface IPortfolio {
    value: number;
}
export interface IAddProfitAndLossScheduleForm {
    userAccountId: number;
    portfolioId: IPortfolio;
    pricingCurve: number;
    schedule: string;
    cashBasedModel: string;
    tokenBasedModel: string;
}

export interface ISpeedUpSource {
    fee: string;
    processingTime: string;
    isChecked: boolean;
    priority: number;
}
export interface IDynamicTableDialogData {
    profitAndLossDefinitionId: number;
    priority: number;
}
