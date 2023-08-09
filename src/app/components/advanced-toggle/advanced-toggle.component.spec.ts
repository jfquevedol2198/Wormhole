import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedToggleComponent } from './advanced-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdvancedToggleComponent', () => {
    let component: AdvancedToggleComponent;
    let fixture: ComponentFixture<AdvancedToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvancedToggleComponent],
            imports: [MatSlideToggleModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
