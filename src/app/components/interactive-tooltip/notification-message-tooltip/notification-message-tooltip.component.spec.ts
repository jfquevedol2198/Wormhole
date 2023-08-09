import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../../../services/api/api.service';
import { AuditService } from '../../../services/audit/audit.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { NotificationMessageTooltipComponent } from './notification-message-tooltip.component';

describe('NotificationMessageTooltip', async () => {
    let fixture: ComponentFixture<NotificationMessageTooltipComponent>;
    let component: NotificationMessageTooltipComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NotificationMessageTooltipComponent],
                imports: [
                    CommonModule,
                    NgxTippyModule,
                    HttpClientTestingModule,
                ],
                providers: [AuditService, ApiService, ConfigurationService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationMessageTooltipComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
