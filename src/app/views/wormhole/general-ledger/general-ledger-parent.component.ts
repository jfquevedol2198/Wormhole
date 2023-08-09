import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralLedgerService } from './general-ledger.service';

@Component({
    templateUrl: './general-ledger-parent.component.html',
    styleUrls: ['./general-ledger.component.scss'],
})
export class GeneralLedgerParentComponent implements OnInit {
    view = 0;
    constructor(
        public activatedRoute: ActivatedRoute,
        public generalLedgerService: GeneralLedgerService,
    ) {}

    ngOnInit(): void {
        this.view = this.generalLedgerService.view;
    }
}
