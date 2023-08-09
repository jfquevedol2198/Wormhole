import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { IGetBlockchainResponse } from '../../interfaces/ledger.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class ReferenceDataService {
    constructor(private readonly api: ApiService) {}

    getSupportedLedgers(): Observable<string[]> {
        return this.api
            .get<IGetBlockchainResponse>('ReferenceData/GetSupportedLedgers')
            .pipe(map((response) => response.records));
    }
}
