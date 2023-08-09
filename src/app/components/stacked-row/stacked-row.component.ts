import { formatValue } from 'src/app/utilities/format-value';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IAssetPerformance } from '../../interfaces/asset.interface';
import { IPlatformPerformance } from '../../interfaces/platform.interface';

@Component({
    selector: 'app-stacked-row',
    templateUrl: './stacked-row.component.html',
    styleUrls: ['./stacked-row.component.scss'],
})
export class StackedRowComponent {
    @Input() data: IPlatformPerformance | IAssetPerformance;
    @Input() namesWithColors;
    @Output() highlightColumn: EventEmitter<string> =
        new EventEmitter<string>();

    formatValue = formatValue;

    getBackgroundColor(element: any) {
        return this.namesWithColors.filter(
            (platformNameWithColor) =>
                platformNameWithColor.name === element.name,
        )[0].color;
    }

    mouseenter(element: any) {
        if (element.columnName) {
            this.highlightColumn.emit(element.columnName);
        }
    }

    mouseout(element: any) {
        if (element.columnName) {
            this.highlightColumn.emit('');
        }
    }

    getElementWidth(element: any) {
        return `calc(${
            element.absolutePercentage || element.percentage
        }% - 0.1rem`;
    }
}
