import { Component } from '@angular/core';

import { IAgent } from '../../../interfaces/agent.interface';
import { IColumn } from '../../../interfaces/column.interface';
import { WorkersService } from '../../../services/workers/workers.service';
import { workerAgentsDataColumns } from './workerAgentsDataColumns';

@Component({
    selector: 'app-configuration-worker-agents',
    templateUrl: './workerAgents.component.html',
    styleUrls: ['./workerAgents.component.scss'],
})
export class WorkerAgentsComponent {
    workerAgentsData: IAgent[];
    workerAgentsDataColumns: IColumn[] = workerAgentsDataColumns;
    displayedColumns = this.workerAgentsDataColumns.map(
        (column) => column.columnDef,
    );

    constructor(public service: WorkersService) {
        this.service
            .getAgents()
            .subscribe((agents) => (this.workerAgentsData = agents));
    }

    toggleAgent(agent: IAgent) {
        this.service.modifyAgent({
            ...agent,
            enabled: !agent.enabled,
        });
    }

    renameAgent(event, agent: IAgent) {
        this.service.modifyAgent({
            ...agent,
            name: event.target.value,
        });
    }
}
