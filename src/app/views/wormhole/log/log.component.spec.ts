import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';

import { LogComponent } from './log.component';

describe('LogComponent', async () => {
    let fixture: ComponentFixture<LogComponent>;
    let component: LogComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSelectModule,
                MatToolbarModule,
            ],
            declarations: [LogComponent],
            providers: [ApiService, ConfigurationService, WormholeService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should change log level', () => {
        const newLogLevel = 'Verbose';
        spyOn(component.service, 'changeLogLevel');

        component.changeLogLevel(newLogLevel);

        expect(component.service.changeLogLevel).toHaveBeenCalledWith(
            newLogLevel,
        );
    });
});
