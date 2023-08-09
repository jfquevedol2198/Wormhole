import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IAssetPerformance } from '../../../../../interfaces/asset.interface';
import { IColumn } from '../../../../../interfaces/column.interface';
import { INameWithColors } from '../../../../../interfaces/nameWithColor.interface';
import { IPlatformPerformance } from '../../../../../interfaces/platform.interface';
import { inventoryColumns } from '../invetory-columns';

@Component({
    selector: 'app-inventory-performance-table',
    templateUrl: './inventory-performance-table.component.html',
})
export class InventoryPerformanceTableComponent implements OnInit {
    @Input() inventoryPerformance: IPlatformPerformance | IAssetPerformance;
    @Input() propertiesWithColors: INameWithColors[];

    @Output() sort: EventEmitter<any> = new EventEmitter<any>();

    columns: IColumn[] = inventoryColumns;
    displayedColumns: string[] = [];

    ngOnInit() {
        this.displayedColumns = this.columns.map((column) => column.columnDef);
    }

    getBackgroundColor(highlightColumn: string) {
        return this.propertiesWithColors.filter(
            (val) => val.columnDef === highlightColumn,
        )[0].backgroundColor;
    }

    sortInventoryPerformance(
        isButtonPressed: boolean,
        columnDef: string,
        inventoryPerformance: IPlatformPerformance | IAssetPerformance,
    ) {
        this.sort.emit({
            isButtonPressed,
            columnDef,
            inventoryPerformance,
        });
    }
}
