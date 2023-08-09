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
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { SharedSettingsComponent } from './sharedSettings.component';

const SETTINGDATA = {
    accountId: 0,
    agentId: 0,
    group: 'group',
    key: 'string',
    subKey: 'string',
    value: 'string',
};

describe('SharedSettingsComponent', async () => {
    let fixture: ComponentFixture<SharedSettingsComponent>;
    let component: SharedSettingsComponent;

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
                declarations: [SharedSettingsComponent],
                providers: [ApiService, ConfigurationService, WormholeService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SharedSettingsComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should update shared setting', () => {
        spyOn(component.service, 'updateSetting');

        const newValue = 'New Value';

        component.updateSharedSetting(
            { target: { value: newValue } },
            SETTINGDATA,
        );

        expect(component.service.updateSetting).toHaveBeenCalledWith({
            ...SETTINGDATA,
            value: newValue,
        });
    });
});
