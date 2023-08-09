import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme/theme.service';

import { LineChartComponent } from './line-chart.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LineChartComponent', async () => {
    let fixture: ComponentFixture<LineChartComponent>;
    let component: LineChartComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LineChartComponent],
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    RouterTestingModule,
                ],
                providers: [ThemeService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LineChartComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
