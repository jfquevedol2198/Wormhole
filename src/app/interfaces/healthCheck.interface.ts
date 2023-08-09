import { IWormholeBaseResponse } from './response.interface';

export interface IHealthCheckSchemaInfo {
    schemaName: string;
    schemaSize: string;
}

export interface IHealthCheckWorkerTaskStatus {
    workerName: string;
    lastMasterRun: string;
    scheduled: number;
    running: number;
    completed: number;
    failed: number;
    aborted: number;
    terminated: number;
}

export interface IHealthCheckServiceMetric {
    name: string;
    value: string;
    metricType: string;
}

export interface IHealthCheckServiceFromResponse {
    name: string;
    healthcheck: string;
    availability: string;
    message: string;
    metrics: IHealthCheckServiceMetric[];
}

export interface IChip {
    type: string;
    text: string;
    tooltipText?: string;
}

export interface IHealthCheckService extends IHealthCheckServiceFromResponse {
    chips: IChip[];
    availabilityIcon: string;
}

export interface IHealthCheck {
    uptime: string;
    updating: boolean;
    lastUpdated: string;
    servicesHealthcheck: IHealthCheckService[];
    dbSchemaHealthcheck: IHealthCheckSchemaInfo[];
    workerTaskHealthcheck: IHealthCheckWorkerTaskStatus[];
}

export interface IHealthCheckResponse {
    responseTimestamp: string;
    healthcheck: IHealthCheck;
}

export interface IArtefactInfo {
    schema: string;
    name: string;
    version: string;
    state: string;
    description: string;
    lastUpdated: string;
}

export interface IGetVersionResponse extends IWormholeBaseResponse {
    records: IArtefactInfo[];
    databaseSchemaVersion: string;
}
