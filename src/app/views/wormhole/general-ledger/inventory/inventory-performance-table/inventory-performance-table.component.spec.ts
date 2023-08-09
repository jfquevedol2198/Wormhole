import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPerformanceTableComponent } from './inventory-performance-table.component';

describe('InventoryPerformanceTableComponent', () => {
    let component: InventoryPerformanceTableComponent;
    let fixture: ComponentFixture<InventoryPerformanceTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InventoryPerformanceTableComponent],
            imports: [CommonModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryPerformanceTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
