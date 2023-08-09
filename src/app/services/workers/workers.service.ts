import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { IAgent, IAgentsResponse } from '../../interfaces/agent.interface';
import { IWormholeMessageResponse } from '../../interfaces/response.interface';
import {
    IWorkerTask,
    IWorkerTasksResponse,
} from '../../interfaces/workerTask.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class WorkersService {
    constructor(private readonly api: ApiService) {}

    getAgents(): Observable<IAgent[]> {
        return this.api.get<IAgentsResponse>('Workers/GetAgents').pipe(
            map((response) =>
                response.agents.map((agent) => ({
                    ...agent,
                    lastSeenDate: agent.lastSeen
                        ? moment
                              .utc(agent.lastSeen)
                              .format('DD/MM/YYYY HH:mm:ss')
                        : ' - ',
                })),
            ),
        );
    }

    modifyAgent(agent: IAgent) {
        this.api
            .put<IWormholeMessageResponse>(
                `Workers/ModifyAgent?AgentGuid=${agent.guid}&AgentEnabled=${agent.enabled}&AgentName=${agent.name}`,
                null,
            )
            .subscribe();
    }

    removeAgent(agent: IAgent) {
        this.api
            .delete(`Workers/RemoveAgent?AgentGuid=${agent.guid}`)
            .subscribe();
    }

    getWorkerTasks(): Observable<IWorkerTask[]> {
        return this.api
            .get<IWorkerTasksResponse>('Workers/GetWorkerTasks')
            .pipe(
                map((response) =>
                    response.records.map((workerTask) => ({
                        ...workerTask,
                        taskScheduledDate: workerTask.taskScheduled
                            ? moment
                                  .utc(workerTask.taskScheduled)
                                  .format('DD/MM/YYYY HH:mm:ss')
                            : ' - ',
                        taskStartedDate: workerTask.taskStarted
                            ? moment
                                  .utc(workerTask.taskStarted)
                                  .format('DD/MM/YYYY HH:mm:ss')
                            : ' - ',
                        taskCompletedDate: workerTask.taskCompleted
                            ? moment
                                  .utc(workerTask.taskCompleted)
                                  .format('DD/MM/YYYY HH:mm:ss')
                            : ' - ',
                        lockDate: new Date(workerTask.lockTimestamp),
                    })),
                ),
            );
    }

    restartFailedTask(workerTaskId: number) {
        this.api
            .put(`Workers/RestartFailedTask?workerTaskId=${workerTaskId}`, null)
            .subscribe();
    }

    enableAgent() {
        return this.api.get<IWormholeMessageResponse>('Workers/EnableAgent');
    }

    disableAgent() {
        this.api
            .get<IWormholeMessageResponse>('Workers/DisableAgent')
            .subscribe();
    }
}
