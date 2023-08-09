import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';

import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';

import { HealthCheckComponent } from './healthCheck.component';

describe('HealthCheckComponent', async () => {
    let fixture: ComponentFixture<HealthCheckComponent>;
    let component: HealthCheckComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatCardModule],
            declarations: [HealthCheckComponent],
            providers: [ApiService, ConfigurationService, WormholeService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HealthCheckComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
