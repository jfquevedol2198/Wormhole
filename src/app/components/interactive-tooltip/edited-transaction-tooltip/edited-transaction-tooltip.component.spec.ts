import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../../../services/api/api.service';
import { AuditService } from '../../../services/audit/audit.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { EditedTransactionTooltipComponent } from './edited-transaction-tooltip.component';

describe('EditedTransactionTooltip', async () => {
    let fixture: ComponentFixture<EditedTransactionTooltipComponent>;
    let component: EditedTransactionTooltipComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [EditedTransactionTooltipComponent],
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
        fixture = TestBed.createComponent(EditedTransactionTooltipComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
