import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { DynamicTableComponent } from './dynamic-table.component';

describe('DynamicTableComponent', async () => {
    let fixture: ComponentFixture<DynamicTableComponent>;
    let component: DynamicTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    MatDialogModule,
                ],
                declarations: [DynamicTableComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
