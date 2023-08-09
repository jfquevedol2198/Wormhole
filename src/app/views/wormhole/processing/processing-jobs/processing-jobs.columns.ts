import moment from 'moment';
import { IProcessingJob } from 'src/app/interfaces/processing-jobs.interface';

export const processingJobsColumns = [
    {
        columnDef: 'workerTaskId',
        header: 'Task ID',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) =>
            `${processingJob.workerTaskId}`,
    },
    {
        columnDef: 'startBlockNumber',
        header: 'Start Height',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.taskParameters &&
                processingJob.taskParameters.startBlockNumber
                ? `${processingJob.taskParameters.startBlockNumber}`
                : '-';
        },
    },
    {
        columnDef: 'endBlockNumber',
        header: 'End Height',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.taskParameters &&
                processingJob.taskParameters.endBlockNumber
                ? `${processingJob.taskParameters.endBlockNumber}`
                : '-';
        },
    },
    {
        columnDef: 'agent.name',
        header: 'Agent',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.agent ? `${processingJob.agent.name}` : '-';
        },
    },
    {
        columnDef: 'runCounter',
        header: 'Run Count',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.runCounter
                ? `${processingJob.runCounter}`
                : '-';
        },
    },
    {
        columnDef: 'sessionId',
        header: 'Session ID',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.sessionId ? `${processingJob.sessionId}` : '-';
        },
    },
    {
        columnDef: 'taskScheduled',
        header: 'Scheduled',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) =>
            moment
                .utc(processingJob.taskScheduled)
                .format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        columnDef: 'taskStarted',
        header: 'Started',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.taskStarted
                ? moment
                      .utc(processingJob.taskStarted)
                      .format('DD/MM/YYYY HH:mm:ss')
                : '-';
        },
    },

    {
        columnDef: 'taskCompleted',
        header: 'Completed',
        columnType: '',
        isSortable: true,
        cell: (processingJob: IProcessingJob) => {
            return processingJob.taskCompleted
                ? moment
                      .utc(processingJob.taskCompleted)
                      .format('DD/MM/YYYY HH:mm:ss')
                : '-';
        },
    },
    {
        columnDef: 'state',
        header: 'Status',
        columnType: 'chip',
        isSortable: true,
    },
    {
        columnDef: 'isToggled',
        header: 'Active',
        columnType: 'slideToggle',
        isSortable: true,
    },
    {
        columnDef: 'actions',
        header: 'Action',
        columnType: 'action-menu',
        isSortable: true,
    },
];
