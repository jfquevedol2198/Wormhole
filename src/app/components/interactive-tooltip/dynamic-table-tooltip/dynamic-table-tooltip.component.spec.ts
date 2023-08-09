import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { DynamicTableTooltipComponent } from './dynamic-table-tooltip.component';

describe('DynamicTableTooltip', async () => {
    let fixture: ComponentFixture<DynamicTableTooltipComponent>;
    let component: DynamicTableTooltipComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DynamicTableTooltipComponent],
                imports: [
                    CommonModule,
                    NgxTippyModule,
                    HttpClientTestingModule,
                ],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicTableTooltipComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
