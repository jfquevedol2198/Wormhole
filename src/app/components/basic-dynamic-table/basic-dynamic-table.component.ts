import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import {
    ISortColumn,
    SortDirection,
} from '../../interfaces/sort-column.interface';

@Component({
    selector: 'app-basic-dynamic-table',
    templateUrl: './basic-dynamic-table.component.html',
})
export class BasicDynamicTableComponent implements OnInit {
    @Input() dataSource = [];
    @Input() columns = [];
    @Input() defaultSortingColumn: string;
    @Input() defaultSortingOrder: SortDirection;
    @Input() length: number;
    @Input() pageSize: number;
    @Input() pageIndex: number;
    @Input() isPaginatedTable: boolean;
    @Input() sortColumns: ISortColumn[];

    @Output() sort: EventEmitter<any> = new EventEmitter<any>();

    displayedColumns: string[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.displayedColumns = this.columns.map((column) => column.columnDef);
    }

    page(pageIndex: number, pageSize: number) {
        this.router.navigate([], {
            queryParams: {
                pageIndex,
                pageSize,
            },
            queryParamsHandling: 'merge',
        });
    }

    sortTable(isButtonPressed: boolean, columnDef: string) {
        this.sort.emit({
            isButtonPressed,
            columnDef,
        });
    }
}
