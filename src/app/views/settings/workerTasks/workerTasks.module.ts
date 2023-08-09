import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BasicDynamicTableModule } from '../../../components/basic-dynamic-table/basic-dynamic-table.module';
import { DatePipeModule } from '../../../pipes/date/date.pipe.module';
import { WorkersService } from '../../../services/workers/workers.service';
import { WorkerTasksComponent } from './workerTasks.component';

@NgModule({
    declarations: [WorkerTasksComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        DatePipeModule,
        BasicDynamicTableModule,
        MatProgressSpinnerModule,
    ],
    providers: [WorkersService],
    exports: [WorkerTasksComponent],
})
export class WorkerTasksModule {}
