import { skip, take } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ThemeService } from './services/theme/theme.service';
import { GeneralLedgerService } from './views/wormhole/general-ledger/general-ledger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        public themeService: ThemeService,
        private generalLedgerService: GeneralLedgerService,
        private activatedRoute: ActivatedRoute,
    ) {
        setInterval(() => this.themeService.getTheme(), 1000);
    }

    ngOnInit(): void {
        // run it only once and first time query params are empty so we need to skip
        this.activatedRoute.queryParams
            .pipe(skip(1), take(1))
            .subscribe((data) => {
                this.generalLedgerService.init();
            });
    }

    ngOnDestroy(): void {
        this.generalLedgerService.unsubscribe();
    }
}
