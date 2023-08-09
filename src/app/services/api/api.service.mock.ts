import { Observable, of } from 'rxjs';

import { IApiParameter } from '../../interfaces/apiParameter.interface';

const TRANSACTIONSDATA = require('../../../mocks/transactions.json');

export class ApiServiceMock {
    get<T>(endpoint: string, params?: IApiParameter[]): Observable<T> {
        return of(TRANSACTIONSDATA);
    }

    put<T>(endpoint: string, data: any | null): Observable<T> {
        return of(<T>{});
    }

    delete<T>(endpoint, data?: any | null): Observable<T> {
        return of(<T>{});
    }
}
