import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ErrorDialogComponent', async () => {
    let fixture: ComponentFixture<ErrorDialogComponent>;
    let component: ErrorDialogComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorDialogComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorDialogComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
