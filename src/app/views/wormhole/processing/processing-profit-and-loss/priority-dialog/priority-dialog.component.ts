import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IColumn } from 'src/app/interfaces/column.interface';
import { ISpeedUpSource } from 'src/app/interfaces/processing-jobs.interface';

import { ProcessingService } from '../../processing.service';
import {
    priorityTableColumns,
    priorityTableData,
} from './priotity-dialog.helpers';

@Component({
    selector: 'app-dynamic-table-dialog',
    templateUrl: './priority-dialog.component.html',
})
export class PriorityDialogComponent {
    displayedColumns: string[];
    priorityTableData: ISpeedUpSource[] = priorityTableData;
    priorityTableColumns: IColumn[] = priorityTableColumns;

    constructor(
        public processingService: ProcessingService,
        public dialogRef: MatDialogRef<PriorityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.displayedColumns = this.priorityTableColumns.map(
            (column) => column.columnDef,
        );
        this.setCurrentPriority();
    }

    setCurrentPriority() {
        this.priorityTableData.forEach((priorityData) => {
            if (this.data.priority === priorityData.priority) {
                priorityData.isChecked = true;
            }
        });
    }

    updatePriority() {
        const selectedPriority = this.getSelectedPriority();
        this.processingService
            .modifyProfitAndLossDefinition({
                priority: selectedPriority,
                profitAndLossDefinitionId: this.data.profitAndLossDefinitionId,
            })
            .subscribe(() => {
                this.dialogRef.close(true);
            });
    }

    getSelectedPriority() {
        return this.priorityTableData.some(
            (priorityData) => priorityData.isChecked,
        )
            ? this.priorityTableData.filter(
                (priorityData) => priorityData.isChecked,
            )[0].priority
            : 0;
    }

    selectPriority(priority: number) {
        this.priorityTableData.forEach((priorityData) => {
            priorityData.isChecked = priorityData.priority === priority;
        });
    }
}
