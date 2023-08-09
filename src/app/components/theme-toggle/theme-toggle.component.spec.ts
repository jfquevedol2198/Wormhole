import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from 'src/app/services/theme/theme.service';

import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
    let component: ThemeToggleComponent;
    let fixture: ComponentFixture<ThemeToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ThemeToggleComponent],
            providers: [ThemeService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
