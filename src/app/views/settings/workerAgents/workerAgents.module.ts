import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';
import { WorkersService } from '../../../services/workers/workers.service';
import { WorkerAgentsComponent } from './workerAgents.component';

@NgModule({
    declarations: [WorkerAgentsComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        DatePipeModule,
        MatTableModule,
    ],
    providers: [WorkersService],
    exports: [WorkerAgentsComponent],
})
export class WorkerAgentsModule {}
