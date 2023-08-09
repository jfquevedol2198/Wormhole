import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { WormholeNotificationsComponent } from './wormhole-notifications.component';

describe('NotificationsComponent', () => {
    let component: WormholeNotificationsComponent;
    let fixture: ComponentFixture<WormholeNotificationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WormholeNotificationsComponent],
            imports: [
                HttpClientTestingModule,
                MatProgressSpinnerModule,
                RouterTestingModule,
            ],
            providers: [
                NotificationsService,
                FormBuilder,
                ApiService,
                ConfigurationService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WormholeNotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
