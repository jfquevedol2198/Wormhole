import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    IAccessTokenData,
    INonceData,
} from '../../interfaces/authentication-data.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class UserAccountsService {
    ledgerName = 'Ethereum';
    constructor(private readonly api: ApiService) {}

    getUserNonce(publicAddress: string): Observable<INonceData> {
        return this.api
            .post<INonceData>(
                `UserAccounts/GetOrCreateUserAccount/${this.ledgerName}?publicAddress=${publicAddress}`,
                {},
            )
            .pipe(map((response) => response));
    }

    getAccessToken(
        publicAddress: string,
        signature: string,
    ): Observable<IAccessTokenData> {
        const params = { publicAddress, signature };
        return this.api
            .post<IAccessTokenData>(
                `UserAccounts/Authenticate/${this.ledgerName}`,
                params,
            )
            .pipe(map((response) => response));
    }

    refreshToken(
        accessToken: string,
        refreshToken: string,
    ): Observable<IAccessTokenData> {
        const params = { accessToken, refreshToken };
        return this.api
            .post<IAccessTokenData>('UserAccounts/RefreshToken', params)
            .pipe(map((response) => response));
    }
}
