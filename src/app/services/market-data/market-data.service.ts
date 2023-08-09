import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    IProvider,
    IProvidersResponse,
} from '../../interfaces/provider.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class MarketDataService {
    constructor(private readonly api: ApiService) {}

    getExchangeRateProviders(): Observable<IProvider[]> {
        return this.api
            .get<IProvidersResponse>('MarketData/GetExchangeRateProviders')
            .pipe(map((response) => response.records));
    }
}
