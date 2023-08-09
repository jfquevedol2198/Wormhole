import { of } from 'rxjs';

import { IApiParameter } from '../../interfaces/apiParameter.interface';

export class ApiCacheService {
    isApiCacheOn: boolean;
    isApiCacheOnReadOnly: boolean;
    cacheKey = 'cache';
    cacheKeyValueReadOnly = 'readOnly';

    protected getQueryParamsString(params: IApiParameter[]): string {
        return params && params.length > 0
            ? `?${params
                .map((param) => `${param.name}=${param.value}`)
                .join('&')}`
            : '';
    }

    protected doesCacheDataExistsForGET(
        endPoint: string,
        params: IApiParameter[],
    ): boolean {
        return !!localStorage.getItem(this.getCacheKeyForGET(endPoint, params));
    }

    protected doesCacheDataExistsForPOST(endPoint: string, data: any): boolean {
        return !!localStorage.getItem(this.getCacheKeyForPOST(endPoint, data));
    }

    protected getDataFromStorageForGET(endpoint, parameters: IApiParameter[]) {
        const value = localStorage.getItem(
            this.getCacheKeyForGET(endpoint, parameters),
        );

        return of(JSON.parse(value));
    }

    protected getDataFromStorageForPOST(endpoint, data) {
        const value = localStorage.getItem(
            this.getCacheKeyForPOST(endpoint, data),
        );

        return of(JSON.parse(value));
    }

    protected saveDataForGET(
        endpoint: string,
        params: IApiParameter[],
        data: any,
    ) {
        localStorage.setItem(
            this.getCacheKeyForGET(endpoint, params),
            JSON.stringify(data),
        );
    }

    protected saveDataForPOST(endpoint: string, data: any, apiData: any) {
        localStorage.setItem(
            this.getCacheKeyForPOST(endpoint, data),
            JSON.stringify(apiData),
        );
    }

    protected isCacheEnabledReadOnly(): boolean {
        if (this.isApiCacheOnReadOnly === undefined) {
            this.isApiCacheOnReadOnly =
                localStorage.getItem(this.cacheKey) ===
                this.cacheKeyValueReadOnly;
        }

        return this.isApiCacheOnReadOnly;
    }

    protected isCacheEnabled(): boolean {
        if (this.isApiCacheOn === undefined) {
            this.isApiCacheOn = !!localStorage.getItem(this.cacheKey);
        }

        return this.isApiCacheOn;
    }

    private getCacheKeyForGET(
        endPoint: string,
        parameters: IApiParameter[],
    ): string {
        return `cache:GET:/${endPoint}${this.getQueryParamsString(parameters)}`;
    }

    private getCacheKeyForPOST(endPoint: string, data: any): string {
        return `cache:POST:/${endPoint}${JSON.stringify(data)}`;
    }
}
