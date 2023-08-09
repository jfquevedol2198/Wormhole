import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BarChartComponent', async () => {
    let fixture: ComponentFixture<BarChartComponent>;
    let component: BarChartComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [BarChartComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarChartComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
