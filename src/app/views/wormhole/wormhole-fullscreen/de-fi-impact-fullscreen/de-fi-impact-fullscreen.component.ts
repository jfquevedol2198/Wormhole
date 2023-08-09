import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';

@Component({
    selector: 'app-de-fi-impact-fullscreen',
    templateUrl: './de-fi-impact-fullscreen.component.html',
})
export class DeFiImpactFullscreenComponent {
    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
    ) {}
}
