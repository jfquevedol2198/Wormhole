import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

import { IColumn } from '../../interfaces/column.interface';
import { ISortColumn } from '../../interfaces/sort-column.interface';

@Component({
    selector: 'app-table-header-component',
    templateUrl: './table-header.component.html',
    styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnChanges {
    @Input() column: IColumn;
    @Input() sortColumns: ISortColumn[];
    @Output() sort: EventEmitter<any> = new EventEmitter<any>();

    isColumnSelected: boolean;
    isSortAsc: boolean;

    ngOnChanges(changes: SimpleChanges) {
        this.isColumnSelected = this.checkIsColumnSelected(
            this.column.columnDef,
        );
        this.isSortAsc = this.checkIsSortAsc(this.column.columnDef);
    }

    onHeaderClick(event: any, columnDef: string) {
        this.sort.emit({
            isButtonPressed: event.metaKey || event.ctrlKey,
            columnDef,
        });
    }

    checkIsColumnSelected(columnDef: string) {
        return this.sortColumns.some(
            (column) => column.columnDef === columnDef,
        );
    }

    checkIsSortAsc(columnDef: string) {
        if (this.checkIsColumnSelected(columnDef)) {
            return (
                this.sortColumns.filter(
                    (column) => column.columnDef === columnDef,
                )[0].direction === 'asc'
            );
        } else {
            return true;
        }
    }

    getColumnIndex(columnDef: string) {
        let columnIndex = 0;
        this.sortColumns.forEach((column, index) => {
            if (column.columnDef === columnDef) {
                columnIndex = index + 1;
            }
        });
        return columnIndex;
    }
}
