import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralLedgerService } from './general-ledger.service';

@Component({
    template: '',
})
export abstract class GeneralLedgerBaseComponent {
    lineChartFields = {
        date: 'Date',
        pnl: 'Profit & Loss',
    };

    constructor(
        public router: Router,
        public generalLedgerService: GeneralLedgerService,
    ) {}
}
