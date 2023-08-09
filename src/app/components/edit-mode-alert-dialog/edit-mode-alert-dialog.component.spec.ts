import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { EditModeAlertDialogComponent } from './edit-mode-alert-dialog.component';

describe('EditModeAlertDialogComponent', async () => {
    let fixture: ComponentFixture<EditModeAlertDialogComponent>;
    let component: EditModeAlertDialogComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [EditModeAlertDialogComponent],
                providers: [{ provide: MatDialogRef, useValue: {} }],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EditModeAlertDialogComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
