import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenMetricsTableComponent } from './token-metrics-table.component';

describe('TokenMetricsTableComponent', async () => {
    let fixture: ComponentFixture<TokenMetricsTableComponent>;
    let component: TokenMetricsTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    MatDialogModule,
                ],
                declarations: [TokenMetricsTableComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenMetricsTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
