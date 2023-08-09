import { Component, OnDestroy } from '@angular/core';

import { IColumn } from '../../../interfaces/column.interface';
import { IWorkerTask } from '../../../interfaces/workerTask.interface';
import { WorkersService } from '../../../services/workers/workers.service';
import { workerTasksDataColumns } from './workerTasksDataColumns';

@Component({
    selector: 'app-configuration-worker-tasks',
    templateUrl: './workerTasks.component.html',
})
export class WorkerTasksComponent implements OnDestroy {
    workerTasksData: IWorkerTask[] = [];
    workerTasksDataColumns: IColumn[] = workerTasksDataColumns;

    isWorkerTasksLoading = true;
    workerTasksInterval;
    refreshDelay = 60000;

    constructor(public service: WorkersService) {
        this.updateTasks();
        this.workerTasksInterval = setInterval(() => {
            this.isWorkerTasksLoading = true;
            this.updateTasks();
        }, this.refreshDelay);
    }

    ngOnDestroy() {
        if (this.workerTasksInterval) {
            clearInterval(this.workerTasksInterval);
        }
    }

    updateTasks() {
        this.service.getWorkerTasks().subscribe((workerTasks) => {
            this.workerTasksData = workerTasks;
            this.isWorkerTasksLoading = false;
        });
    }
}
