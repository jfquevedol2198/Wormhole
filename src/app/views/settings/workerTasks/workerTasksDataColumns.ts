import { IWorkerTask } from '../../../interfaces/workerTask.interface';

export const workerTasksDataColumns = [
    {
        columnDef: 'type',
        header: 'Type',
        columnType: '',
        cell: (workerTask: IWorkerTask) => `${workerTask.taskType}`,
    },
    {
        columnDef: 'state',
        header: 'State',
        columnType: '',
        cell: (workerTask: IWorkerTask) => `${workerTask.state}`,
    },
    {
        columnDef: 'workerName',
        header: 'Worker Name',
        columnType: '',
        cell: (workerTask: IWorkerTask) => `${workerTask.workerName}`,
    },
    {
        columnDef: 'agentName',
        header: 'Agent Name',
        columnType: '',
        cell: (workerTask: IWorkerTask) =>
            workerTask.agent ? workerTask.agent.name : ' - ',
    },
    {
        columnDef: 'scheduled',
        header: 'Scheduled',
        columnType: '',
        cell: (workerTask: IWorkerTask) => workerTask.taskScheduledDate,
    },
    {
        columnDef: 'started',
        header: 'Started',
        columnType: '',
        cell: (workerTask: IWorkerTask) => workerTask.taskStartedDate,
    },
    {
        columnDef: 'completed',
        header: 'completed',
        columnType: '',
        cell: (workerTask: IWorkerTask) => workerTask.taskCompletedDate,
    },
];
