import {
    IDynamicTableDialogData,
    ISpeedUpSource,
} from 'src/app/interfaces/processing-jobs.interface';
import { ProcessingService } from 'src/app/views/wormhole/processing/processing.service';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dynamic-table-dialog',
    templateUrl: './dynamic-table-dialog.component.html',
})
export class DynamicTableDialogComponent {
    checkedPriority;
    basicTableSource: ISpeedUpSource[] = [
        {
            fee: 'Free',
            processingTime: '72 hours',
            isChecked: false,
            priority: 0,
        },
        {
            fee: '0.001 ETH',
            processingTime: '24 hours',
            isChecked: false,
            priority: 1,
        },
        {
            fee: '0.05 ETH',
            processingTime: '12 hours',
            isChecked: false,
            priority: 2,
        },
        {
            fee: '0.1 ETH',
            processingTime: '1 hour',
            isChecked: false,
            priority: 3,
        },
    ];

    basicTableColumns = [
        {
            columnDef: 'fee',
            header: 'Fee',
            columnType: '',
            cell: (data) => `${data.fee}`,
        },
        {
            columnDef: 'processingTime',
            header: 'Processing Time',
            columnType: '',
            cell: (data) => `${data.processingTime}`,
        },
        {
            columnDef: ' ',
            header: ' ',
            columnType: 'checkbox',
            isSortable: false,
        },
    ];
    constructor(
        public processingService: ProcessingService,
        @Inject(MAT_DIALOG_DATA) public data: IDynamicTableDialogData,
    ) {
        this.setPriority();
    }
    setPriority() {
        this.basicTableSource.map((source) => {
            if (this.data.priority === source.priority) {
                return (source.isChecked = true);
            }
        });
    }
    selectRow(checkedSource: ISpeedUpSource) {
        const newBasicTableSource = this.basicTableSource.map((source) => {
            if (checkedSource.fee === source.fee) {
                return {
                    ...source,
                    isChecked: !source.isChecked,
                };
            } else {
                return {
                    ...source,
                    isChecked: false,
                };
            }
        });

        this.basicTableSource = newBasicTableSource;
        this.checkedPriority = checkedSource.priority;
    }
    updatePriority() {
        this.processingService
            .modifyProfitAndLossDefinition({
                priority: this.checkedPriority,
                profitAndLossDefinitionId: this.data.profitAndLossDefinitionId,
            })
            .subscribe((data) => {
                // TODO: update list of definitions
            });
    }
}
