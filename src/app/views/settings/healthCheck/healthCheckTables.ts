import {
    IHealthCheckSchemaInfo,
    IHealthCheckService,
    IHealthCheckWorkerTaskStatus,
} from '../../../interfaces/healthCheck.interface';
import { IRuntimeData } from '../../../interfaces/runtimeData.interface';

export const runtimeInformationDataColumns = [
    {
        columnDef: 'field',
        header: 'Field',
        columnType: '',
        cell: (runtimeDataElement: IRuntimeData) => runtimeDataElement.field,
    },
    {
        columnDef: 'value',
        header: 'Value',
        columnType: '',
        cell: (runtimeDataElement: IRuntimeData) => runtimeDataElement.value,
    },
];

export const schemaInformationDataColumns = [
    {
        columnDef: 'schemaName',
        header: 'Schema Name',
        columnType: '',
        cell: (schemaInfo: IHealthCheckSchemaInfo) => schemaInfo.schemaName,
    },
    {
        columnDef: 'schemaSize',
        header: 'Schema Size',
        columnType: '',
        cell: (schemaInfo: IHealthCheckSchemaInfo) => schemaInfo.schemaSize,
    },
];

export const serviceStatusDataColumns = [
    {
        columnDef: 'availability',
        header: '',
        columnType: 'icon',
        cell: (serviceStatus: IHealthCheckService) =>
            serviceStatus.availabilityIcon,
        textColor: (serviceStatus: IHealthCheckService) =>
            serviceStatus.availability === 'Stopped'
                ? 'app-error'
                : serviceStatus.availability === 'Running'
                ? 'app-success'
                : serviceStatus.availability === 'PerRequest'
                ? 'app-warning'
                : '',
        tooltip: (serviceStatus: IHealthCheckService) =>
            serviceStatus.availability,
    },
    {
        columnDef: 'name',
        header: 'Name',
        columnType: '',
        cell: (serviceStatus: IHealthCheckService) => serviceStatus.name,
    },
    {
        columnDef: 'healthcheck',
        header: 'Health check',
        columnType: '',
        cell: (serviceStatus: IHealthCheckService) => serviceStatus.healthcheck,
    },
    {
        columnDef: 'message',
        header: 'Message',
        columnType: '',
        cell: (serviceStatus: IHealthCheckService) =>
            serviceStatus.message || '-',
    },
    {
        columnDef: 'chips',
        header: 'Metrics',
        columnType: 'chip',
    },
];

export const workerTasksStatusDataColumns = [
    {
        columnDef: 'workerName',
        header: 'Worker Name',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            workerTask.workerName,
    },
    {
        columnDef: 'lastMasterRun',
        header: 'Last Master Run',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            workerTask.lastMasterRun,
    },
    {
        columnDef: 'scheduled',
        header: 'Scheduled',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.scheduled}`,
    },
    {
        columnDef: 'running',
        header: 'Running',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.running}`,
    },
    {
        columnDef: 'completed',
        header: 'Completed',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.completed}`,
    },
    {
        columnDef: 'failed',
        header: 'Failed',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.failed}`,
    },
    {
        columnDef: 'aborted',
        header: 'Aborted',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.aborted}`,
    },
    {
        columnDef: 'terminated',
        header: 'Terminated',
        columnType: '',
        cell: (workerTask: IHealthCheckWorkerTaskStatus) =>
            `${workerTask.terminated}`,
    },
];
