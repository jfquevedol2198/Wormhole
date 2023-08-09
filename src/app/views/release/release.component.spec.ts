import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { ReleaseComponent } from './release.component';

describe('ReleaseComponent', async () => {
    let fixture: ComponentFixture<ReleaseComponent>;
    let component: ReleaseComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ReleaseComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReleaseComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
