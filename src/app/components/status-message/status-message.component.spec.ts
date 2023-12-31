import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMessageComponent } from './status-message.component';

describe('StatusMessageComponent', () => {
    let component: StatusMessageComponent;
    let fixture: ComponentFixture<StatusMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StatusMessageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusMessageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
