import { Component } from '@angular/core';

import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent {
    lineChartFields = {
        date: 'Date',
        pnl: 'Profit & Loss',
    };

    constructor(public generalLedgerService: GeneralLedgerService) {}
}
