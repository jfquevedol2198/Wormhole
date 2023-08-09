import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GeneralLedgerService } from '../general-ledger.service';

@Component({
    selector: 'app-general-ledger-toolbar',
    templateUrl: './general-ledger-toolbar.component.html',
    styleUrls: ['./general-ledger-toolbar.component.scss'],
})
export class GeneralLedgerToolbarComponent implements OnDestroy, OnInit {
    @Input() alignCenter = false;

    constructor(
        public dialog: MatDialog,
        public router: Router,
        public generalLedgerService: GeneralLedgerService,
    ) {}

    ngOnInit(): void {
        // when view is not defined add missing one to the query param
        this.generalLedgerService.dealWithViewQueryParam();
    }

    ngOnDestroy(): void {
        this.generalLedgerService.unsubscribeView();
    }

    redirectToReportHistoryCreator() {
        this.router.navigate(['/app/analytics'], {
            queryParamsHandling: 'preserve',
        });
    }
}
