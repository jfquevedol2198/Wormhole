import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WorkersService } from '../../../services/workers/workers.service';
import { WorkerTasksComponent } from './workerTasks.component';

describe('WorkerTasksComponent', async () => {
    let fixture: ComponentFixture<WorkerTasksComponent>;
    let component: WorkerTasksComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCardModule,
                    MatIconModule,
                    DatePipeModule,
                ],
                declarations: [WorkerTasksComponent],
                providers: [ApiService, ConfigurationService, WorkersService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerTasksComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
