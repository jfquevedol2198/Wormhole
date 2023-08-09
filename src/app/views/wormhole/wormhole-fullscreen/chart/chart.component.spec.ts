import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ApiServiceMock } from '../../../../services/api/api.service.mock';

import { ChartComponent } from './chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';

describe('ChartComponent', async () => {
    let fixture: ComponentFixture<ChartComponent>;
    let component: ChartComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, HttpClientTestingModule],
                declarations: [ChartComponent],
                providers: [
                    AccountingService,
                    { provide: ApiService, useClass: ApiServiceMock },
                    DataQualityCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
