import { Component, Input } from '@angular/core';

import { formatValue } from '../../utilities/format-value';
import { getShortValue } from '../../utilities/getShortValue';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
    @Input() data;
    @Input() namesWithColors;
    @Input() isBarChartForPercentages;

    formatValue = formatValue;
    getShortValue = getShortValue;

    getBackgroundColor(element: any) {
        return this.namesWithColors.filter(
            (platformNameWithColor) =>
                platformNameWithColor.name === element.name,
        )[0].color;
    }
}
