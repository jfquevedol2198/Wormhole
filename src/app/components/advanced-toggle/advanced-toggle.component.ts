import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-advanced-toggle',
    templateUrl: './advanced-toggle.component.html',
})
export class AdvancedToggleComponent {
    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    toggleMode() {
        if (this.activatedRoute.snapshot.queryParams.view === '3') {
            this.router.navigate(['app/general-ledger/view/0'], {
                queryParams: {
                    view: 0,
                },
                queryParamsHandling: 'merge',
            });
        } else {
            this.router.navigate(['app/general-ledger/view/3'], {
                queryParams: {
                    view: 3,
                },
                queryParamsHandling: 'merge',
            });
        }
    }
}
