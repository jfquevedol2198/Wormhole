import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderComponent } from './table-header.component';

describe('TableHeaderComponent', () => {
    let component: TableHeaderComponent;
    let fixture: ComponentFixture<TableHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHeaderComponent);
        component = fixture.componentInstance;
        component.column = {
            columnDef: ' ',
            header: ' ',
            columnType: 'is-selected-icon',
            isSortable: false,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
