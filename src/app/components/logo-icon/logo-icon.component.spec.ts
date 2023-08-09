import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { LogoIconComponent } from './logo-icon.component';

describe('Logo Icon Component', async () => {
    let fixture: ComponentFixture<LogoIconComponent>;
    let component: LogoIconComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LogoIconComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoIconComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
