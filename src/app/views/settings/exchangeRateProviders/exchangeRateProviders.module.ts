import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { MarketDataService } from '../../../services/market-data/market-data.service';
import { ExchangeRateProvidersComponent } from './exchangeRateProviders.component';

@NgModule({
    declarations: [ExchangeRateProvidersComponent],
    imports: [CommonModule, MatCardModule, MatChipsModule],
    providers: [MarketDataService],
    exports: [ExchangeRateProvidersComponent],
})
export class ExchangeRateProvidersModule {}
