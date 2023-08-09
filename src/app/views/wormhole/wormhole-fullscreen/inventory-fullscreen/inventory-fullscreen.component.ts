import { Subscription } from 'rxjs';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';

@Component({
    selector: 'app-inventory-fullscreen',
    templateUrl: './inventory-fullscreen.component.html',
})
export class InventoryFullscreenComponent {
    subscriptions = new Subscription();

    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
    ) {}
}
