import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { detailExpand } from '../../animations/detailExpand';
import { isRowSelected } from '../../utilities/isRowSelected';
import { TOOLTIP_DEFAULT_PROPS } from '../app-tooltip/app-tooltip.component';
import { DynamicTableDialogComponent } from './dynamic-table-dialog/dynamic-table-dialog.component';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss'],
    animations: [detailExpand],
})
export class DynamicTableComponent implements OnInit {
    @Input() dataSource = [];
    @Input() columns = [];
    @Input() innerColumns = [];
    @Input() innerTableColumns = [];
    @Input() selectedRows = [];
    @Input() length: number;
    @Input() pageSize: number;
    @Input() pageIndex: number;
    @Input() isPaginatedTable: boolean;
    @Input() defaultSortingColumn: string;
    @Input() defaultSortingOrder: string;

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onToggleClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCheckboxClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() onActionClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() sort: EventEmitter<Sort> = new EventEmitter<Sort>();

    displayedColumns: string[];
    displayedInnerColumns: string[];

    isRowSelected = isRowSelected;

    constructor(private router: Router, private dialog: MatDialog) {}

    tippyProps = TOOLTIP_DEFAULT_PROPS;

    ngOnInit() {
        this.displayedColumns = this.columns.map((column) => column.columnDef);
        this.displayedInnerColumns = this.innerColumns.map(
            (column) => column.columnDef,
        );
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

    getInnerData(row) {
        return this.selectedRows.find((element) => element.row === row).data;
    }

    openDialog(profitAndLossDefinitionId: number, priority: number) {
        this.dialog.open(DynamicTableDialogComponent, {
            data: {
                profitAndLossDefinitionId,
                priority,
            },
        });
    }

    actionClick(action: string, row) {
        this.onActionClick.emit({ action, row });
    }
}
