import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { PnlProgressDialogComponent } from './pnl-progress-dialog.component';

describe('PnlProgressDialogComponent', async () => {
    let fixture: ComponentFixture<PnlProgressDialogComponent>;
    let component: PnlProgressDialogComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PnlProgressDialogComponent],
                imports: [RouterTestingModule, MatDialogModule, MatIconModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PnlProgressDialogComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
