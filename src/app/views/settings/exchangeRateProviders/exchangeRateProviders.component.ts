import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { IProvider } from '../../../interfaces/provider.interface';
import { MarketDataService } from '../../../services/market-data/market-data.service';

@Component({
    selector: 'app-configuration-exchange-rate-providers',
    templateUrl: './exchangeRateProviders.component.html',
})
export class ExchangeRateProvidersComponent {
    providers$: Observable<IProvider[]>;

    constructor(public marketDataService: MarketDataService) {
        this.providers$ = this.marketDataService.getExchangeRateProviders();
    }
}
