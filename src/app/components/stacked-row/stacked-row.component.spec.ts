import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { StackedRowComponent } from './stacked-row.component';

describe('StackedRowComponent', async () => {
    let fixture: ComponentFixture<StackedRowComponent>;
    let component: StackedRowComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StackedRowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StackedRowComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
