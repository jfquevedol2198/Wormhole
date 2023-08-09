import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipComponent } from './chip.component';
import { MatChipsModule } from '@angular/material/chips';

describe('ChipComponent', () => {
    let component: ChipComponent;
    let fixture: ComponentFixture<ChipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChipComponent],
            imports: [
                MatChipsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
