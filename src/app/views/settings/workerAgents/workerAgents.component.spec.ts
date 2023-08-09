import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WorkersService } from '../../../services/workers/workers.service';
import { WorkerAgentsComponent } from './workerAgents.component';

const AGENTDATA = {
    guid: '4b2135e7-ed06-49cd-abd5-e5d6d4ded0f3',
    name: 'name',
    enabled: false,
    lastSeen: '2012-12-12 12:12',
    lastSeenDate: '2012-12-12 12:12',
};

describe('WorkerAgentsComponent', async () => {
    let fixture: ComponentFixture<WorkerAgentsComponent>;
    let component: WorkerAgentsComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatInputModule,
                    MatSortModule,
                    DatePipeModule,
                ],
                declarations: [WorkerAgentsComponent],
                providers: [ApiService, ConfigurationService, WorkersService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerAgentsComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle the agent', () => {
        spyOn(component.service, 'modifyAgent');

        component.toggleAgent(AGENTDATA);

        expect(component.service.modifyAgent).toHaveBeenCalledWith({
            ...AGENTDATA,
            enabled: !AGENTDATA.enabled,
        });
    });

    it('should rename the agent', () => {
        spyOn(component.service, 'modifyAgent');

        const newName = 'New Name';

        component.renameAgent({ target: { value: newName } }, AGENTDATA);

        expect(component.service.modifyAgent).toHaveBeenCalledWith({
            ...AGENTDATA,
            name: newName,
        });
    });
});
