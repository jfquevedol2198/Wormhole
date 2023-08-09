import { BehaviorSubject } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';

import {
    INewOverlayData,
    IOperation,
    IOverlay,
} from '../../../../../../../interfaces/operation.interface';
import { AccountingService } from '../../../../../../../services/accounting/accounting.service';
import {
    getOperationAddressData,
    getOperationAssetName,
    getOperationDirection,
    getOperationTreatmentAsString,
    getOperationUsdValue,
} from '../operation-helpers';
import { overlayColumns } from './overlay-columns';

@Component({
    selector: 'app-overlay-table',
    templateUrl: './overlay-table.component.html',
    styleUrls: ['./overlay-table.component.scss'],
})
export class OverlayTableComponent implements OnInit {
    @Input() operation: IOperation;
    overlayData$: BehaviorSubject<IOverlay[]> = new BehaviorSubject([
        {
            name: 'Asset',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
        {
            name: 'Direction',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
        {
            name: 'From',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
        {
            name: 'To',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
        {
            name: 'Treatment',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
        {
            name: 'Asset Quantity',
            originalValue: '-',
            overlayValue: '-',
            blockchainValue: '-',
        },
    ]);
    isOverlayLoading = true;
    columns = overlayColumns;
    displayedColumns: string[];

    constructor(private accountingService: AccountingService) {}

    ngOnInit(): void {
        this.getOverlayData(this.operation);
        this.displayedColumns = this.columns.map((column) => column.columnDef);
        this.isOverlayLoading = false;
    }

    getOverlayData(operation: IOperation) {
        if (operation.statusWithIcon.status === 'Manual') {
            this.setOverlayForManualOperation(operation);
        } else if (operation.statusWithIcon.status === 'Original') {
            this.setOverlayForOriginalOperation(operation);
        } else {
            this.setOverlayForEditedOperation(operation);
        }
    }

    overwriteOverlay(
        overlayData: IOverlay[],
        newOverlayData: INewOverlayData[],
    ): IOverlay[] {
        return overlayData.map((overlayElem, index) => {
            const newOverlayObject = {};
            newOverlayData.map((newOverlayElem) => {
                newOverlayObject[newOverlayElem.property] =
                    newOverlayElem.data[index];
            });
            return Object.assign(overlayElem, newOverlayObject);
        });
    }

    getNewOverlayData(operation: IOperation): string[] {
        return [
            getOperationAssetName(operation),
            getOperationDirection(operation),
            getOperationAddressData(operation, 'From'),
            getOperationAddressData(operation, 'To'),
            getOperationTreatmentAsString(operation),
            getOperationUsdValue(operation),
        ];
    }

    setOverlayForOriginalOperation(operation: IOperation) {
        this.overlayData$.next(
            this.overwriteOverlay(this.overlayData$.getValue(), [
                {
                    data: this.getNewOverlayData(operation),
                    property: 'originalValue',
                },
            ]),
        );
    }

    setOverlayForManualOperation(operation: IOperation) {
        this.overlayData$.next(
            this.overwriteOverlay(this.overlayData$.getValue(), [
                {
                    data: this.getNewOverlayData(operation),
                    property: 'overlayValue',
                },
            ]),
        );
    }

    setOverlayForEditedOperation(operation: IOperation) {
        this.accountingService
            .getOperationById(operation.previousVersion)
            .subscribe((previousOperation) => {
                this.overlayData$.next(
                    this.overwriteOverlay(this.overlayData$.getValue(), [
                        {
                            data: this.getNewOverlayData(previousOperation),
                            property: 'originalValue',
                        },
                        {
                            data: this.getNewOverlayData(operation),
                            property: 'overlayValue',
                        },
                    ]),
                );
            });
    }
}
