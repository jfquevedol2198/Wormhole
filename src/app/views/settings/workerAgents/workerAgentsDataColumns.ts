import { IAgent } from '../../../interfaces/agent.interface';

export const workerAgentsDataColumns = [
    {
        columnDef: 'guid',
        header: 'GUID',
        columnType: '',
        cell: (workerAgent: IAgent) => workerAgent.guid,
    },
    {
        columnDef: 'name',
        header: 'Name',
        columnType: 'input',
        cell: (workerAgent: IAgent) => workerAgent.name,
    },
    {
        columnDef: 'enabled',
        header: 'Enabled',
        columnType: 'checkbox',
    },
    {
        columnDef: 'lastSeen',
        header: 'Last Seen',
        columnType: '',
        cell: (workerAgent: IAgent) => workerAgent.lastSeenDate,
    },
];
