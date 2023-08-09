import { iif, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IApiParameter } from '../../interfaces/apiParameter.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import { ApiCacheService } from './api-cache.service';

const ACCESS_TOKEN_KEY = 'accessToken';

@Injectable()
export class ApiService extends ApiCacheService {
    constructor(
        private readonly http: HttpClient,
        private readonly configuration: ConfigurationService,
    ) {
        super();
    }

    getRequestHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        });
    }

    get<T>(endpoint: string, params?: IApiParameter[]): Observable<T> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) =>
                iif(
                    () =>
                        this.isCacheEnabled() &&
                        this.doesCacheDataExistsForGET(endpoint, params),
                    this.getDataFromStorageForGET(endpoint, params),
                    this.http.get<T>(
                        `${wormholeUrl}/1.0/${endpoint}${this.getQueryParamsString(
                            params,
                        )}`,
                        { headers: this.getRequestHeaders() },
                    ),
                ),
            ),
            tap((data) => {
                if (this.isCacheEnabled() && !this.isCacheEnabledReadOnly()) {
                    this.saveDataForGET(endpoint, params, data);
                }
            }),
        );
    }

    getWithNoJson<T>(
        endpoint: string,
        params?: IApiParameter[],
    ): Observable<T> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) =>
                this.http.get<T>(
                    `${wormholeUrl}/1.0/${endpoint}${this.getQueryParamsString(
                        params,
                    )}`,
                    {
                        headers: this.getRequestHeaders(),
                        responseType: 'text' as 'json',
                    },
                ),
            ),
        );
    }

    put<T>(endpoint: string, data: any | null): Observable<T> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) =>
                this.http.put<T>(`${wormholeUrl}/1.0/${endpoint}`, data, {
                    headers: this.getRequestHeaders(),
                }),
            ),
        );
    }

    post<T>(endpoint: string, data: any | null): Observable<T> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) => {
                return iif(
                    () =>
                        this.isCacheEnabled() &&
                        this.doesCacheDataExistsForPOST(endpoint, data),
                    this.getDataFromStorageForPOST(endpoint, data),
                    this.http.post<T>(`${wormholeUrl}/1.0/${endpoint}`, data, {
                        headers: this.getRequestHeaders(),
                    }),
                );
            }),
            tap((apiData) => {
                if (this.isCacheEnabled() && !this.isCacheEnabledReadOnly()) {
                    this.saveDataForPOST(endpoint, data, apiData);
                }
            }),
        );
    }

    downloadFile(endpoint: string): Observable<Blob> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) =>
                this.http.post(
                    `${wormholeUrl}/1.0/${endpoint}`,
                    {},
                    {
                        responseType: 'blob',
                        headers: this.getRequestHeaders(),
                    },
                ),
            ),
        );
    }

    uploadFile<T>(endpoint, formData: FormData): Observable<T> {
        return this.configuration.getWormholeUrl().pipe(
            switchMap((wormholeUrl) =>
                this.http.post<T>(`${wormholeUrl}/1.0/${endpoint}`, formData, {
                    headers: this.getRequestHeaders(),
                }),
            ),
        );
    }

    delete<T>(endpoint, data?: any | null): Observable<T> {
        const options = {
            headers: this.getRequestHeaders(),
            body: data,
        };

        return this.configuration
            .getWormholeUrl()
            .pipe(
                switchMap((wormholeUrl) =>
                    this.http.delete<T>(
                        `${wormholeUrl}/1.0/${endpoint}`,
                        options,
                    ),
                ),
            );
    }
}
