import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AccountingService } from '../accounting/accounting.service';

@Injectable({ providedIn: 'root' })
export class HealthCheckService {
    public data$: Observable<any>;
    public error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        undefined,
    );

    public dataSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(
        undefined,
    );

    constructor(private accountingService: AccountingService) {
        this.accountingService.getPortfolios().subscribe(
            (data) => this.dataSubject$.next(data),
            (_) => this.error$.next(true),
        );

        this.data$ = this.dataSubject$.pipe(filter((data) => !!data));
    }
}
