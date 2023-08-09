import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-pnl-progress-dialog',
    templateUrl: './pnl-progress-dialog.component.html',
    styleUrls: ['./pnl-progress-dialog.component.scss'],
})
export class PnlProgressDialogComponent {
    portfolioId$: Observable<number>;

    constructor(private activatedRoute: ActivatedRoute) {
        this.portfolioId$ = this.activatedRoute.queryParams.pipe(
            filter((queryParams) => queryParams && queryParams.portfolioId),
            map((queryParams) => parseInt(queryParams.portfolioId)),
        );
    }
}
