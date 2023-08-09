import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { BasicDynamicTableComponent } from './basic-dynamic-table.component';

describe('BasicDynamicTableComponent', async () => {
    let fixture: ComponentFixture<BasicDynamicTableComponent>;
    let component: BasicDynamicTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [BasicDynamicTableComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicDynamicTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
