import { IAgentFromResponse } from './agent.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface IWorkerTask extends IWorkerTaskFromResponse {
    taskScheduledDate: string;
    taskStartedDate: string;
    taskCompletedDate: string;
    agentName: string;
}

export interface IWorkerTaskFromResponse {
    workerTaskId: number;
    ledgerName: string;
    taskType: string;
    workerName: string;
    enabled: true;
    taskScheduled: string;
    taskStarted: string;
    taskCompleted: string;
    state: string;
    taskParameters: string;
    runCounter: number;
    lockTimestamp: string;
    agent: IAgentFromResponse;
    sessionId: string;
    priority: number;
    startDate: string;
    endDate: string;
}

export interface IWorkerTasksResponse extends IWormholeBaseResponse {
    records: IWorkerTask[];
}
