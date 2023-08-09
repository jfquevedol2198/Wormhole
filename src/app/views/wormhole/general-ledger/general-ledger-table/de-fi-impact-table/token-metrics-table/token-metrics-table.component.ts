import { Component, Input, OnInit } from '@angular/core';

import { IColumn } from '../../../../../../interfaces/column.interface';
import { IPNLPriceMovement } from '../../../../../../interfaces/pnlPriceMovement.interface';
import { ITokenMetric } from '../../../../../../interfaces/tokenMetric.interface';
import { getTokenMetrics } from '../../../../../../utilities/getTokenMetrics';
import { tokenMetricColumns } from './token-metric-colums';

@Component({
    selector: 'app-token-metrics-table',
    templateUrl: './token-metrics-table.component.html',
    styleUrls: ['./token-metrics-table.component.scss'],
})
export class TokenMetricsTableComponent implements OnInit {
    @Input() pnlPriceMovement: IPNLPriceMovement;

    tokenMetricsData: ITokenMetric[] = [];

    tokenMetricColumns: IColumn[] = tokenMetricColumns;
    displayedColumns: string[];

    ngOnInit() {
        this.displayedColumns = this.tokenMetricColumns.map(
            (tokenMetricColumn) => tokenMetricColumn.columnDef,
        );

        this.tokenMetricsData = getTokenMetrics(this.pnlPriceMovement);
    }
}
