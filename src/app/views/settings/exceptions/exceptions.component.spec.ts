import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';

import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';

import { ExceptionsComponent } from './exceptions.component';

describe('ExceptionsComponent', async () => {
    let fixture: ComponentFixture<ExceptionsComponent>;
    let component: ExceptionsComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatCardModule, DatePipeModule],
            declarations: [ExceptionsComponent],
            providers: [ApiService, ConfigurationService, WormholeService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExceptionsComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
