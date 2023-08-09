import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    IDataAdminAddressLabelData,
    IDataAdminAddressLabel,
    IDataAdminAddressLabelResponse,
} from 'src/app/interfaces/dataadminAddressLabels.interface';
import {
    IDataAdminAddressLabelJobData,
    IDataAdminAddressLabelJobResponse,
} from 'src/app/interfaces/dataadminAddressLabelsJobs.interface';
import {
    IDataAdminProviderData,
    IDataAdminProviderResponse,
} from 'src/app/interfaces/dataadminMarketDataProvider.interface';
import {
    IDataAdminProviderJobData,
    IDataAdminProviderJobResponse,
} from 'src/app/interfaces/dataadminMarketDataProvidersJobs.interface';
import {
    IDataAdminMethodDefinitionData,
    IDataAdminMethodDefinitionsResponse,
    ICreateAdminMethodDefinitionData,
    ICreateAdminMethodDefinitionResponse
} from 'src/app/interfaces/dataadminMethodDefinitions';
import {
    IDataAdminPlatformData,
    IDataAdminPlatformResponse,
    IDataAdminPlatform
} from 'src/app/interfaces/dataadminPlatforms.interface';
import {
    ISupportedLedgerResponse
} from 'src/app/interfaces/supportedLedger.interface';
import { IDataAdminCurrencyPairData, IDataAdminCurrencyPairResponse } from 'src/app/interfaces/dataadminCurrencyPairs.interface'
import { IDataAdminCurrencyPairJobData, IDataAdminCurrencyPairJobResponse } from 'src/app/interfaces/dataadminCurrencyPairsJobs.interface';
import { IDataAdminCurrencyPairProcessingJobData, IDataAdminCurrencyPairProcessingJobResponse } from 'src/app/interfaces/dataadminCurrencyPairsProcessingJobs.interface';
import { IDataAdminCurrencyPairMarketToMarketResponse, IDataAdminCurrencyPairMarketToMarketData } from 'src/app/interfaces/dataadminCurrencyPairsMarketToMarket.interface';
import {
    IListCoinsData,
    IListCoinsResponse,
} from 'src/app/interfaces/listCoins.interface';
import {
    IDataAdminCurrencyPairDependencyResponse,
    IDataAdminCurrencyPairDependencyData
} from 'src/app/interfaces/dataadminCurrencyPairDependency.interface';
import {
    IDataAdminCurrencyPairUsageResponse,
    IDataAdminCurrencyPairUsageData
} from 'src/app/interfaces/dataadminCurrencyPairUsage.interface';

class BaseData {
    data = [];
    PageIndex = 0;
    PageSize = 50;
    total = 0;
    Sorting = '';
}
export class PlatformsData implements IDataAdminPlatformData {
    data = [];
    PageIndex = 0;
    PageSize = 50;
    total = 0;
    Sorting = '';
}

export class AddressLabelData implements IDataAdminAddressLabelData {
    data = [];
    PageIndex = 0;
    PageSize = 50;
    total = 0;
    Sorting = '';
}

export class AddressLabelJobData implements IDataAdminAddressLabelJobData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

export class MethodDefinitionData implements IDataAdminMethodDefinitionData {
    data = [];
    PageIndex = 0;
    PageSize = 50;
    total = 0;
    Sorting = '';
}

export class ProviderData implements IDataAdminProviderData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

export class ProviderJobData implements IDataAdminProviderJobData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

export class CurrencyPairData extends BaseData implements IDataAdminCurrencyPairData {}

export class CurrencyPairDependencyData extends BaseData implements IDataAdminCurrencyPairDependencyData {}

export class CurrencyPairUsageData extends BaseData implements IDataAdminCurrencyPairUsageData {}

export class CurrencyPairJobData implements IDataAdminCurrencyPairJobData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

export class CurrencyPairProcessingJobData implements IDataAdminCurrencyPairProcessingJobData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

export class CurrencyPairMarketToMarketData extends BaseData implements IDataAdminCurrencyPairMarketToMarketData {}
export class ListCoinsData implements IListCoinsData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = '';
}

@Injectable()
export class DataAdminService {
    platformData$: BehaviorSubject<PlatformsData> = new BehaviorSubject(
        new PlatformsData(),
    );
    isPlatformsDataLoading: boolean = true;
    private baseUrl: string = 'https://dev2.redkite.app/api/1.0';

    constructor(private httpClient: HttpClient) {}

    getPlatform(params) {
        return this.httpClient
            .get<IDataAdminPlatformResponse>(`${this.baseUrl}/ReferenceData/GetPlatforms`, { params })
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    updatePlatform(data: IDataAdminPlatform) {
        return this.httpClient
            .put<{message: string}>(`${this.baseUrl}/ReferenceData/ModifyPlatform`, { ...data })
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getAddressLabels(params) {
        return this.httpClient
            .get<IDataAdminAddressLabelResponse>(
                `${this.baseUrl}/ReferenceData/GetAddressLabel`,
                {
                    params
                }
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getSupportedLedgers() {
        return this.httpClient
                .get<ISupportedLedgerResponse>(`${this.baseUrl}/ReferenceData/GetSupportedLedgers`)
                .pipe(res => res);
    }

    updateAddressLabel(data: IDataAdminAddressLabel) {
        return this.httpClient
            .put<{message: string}>(`${this.baseUrl}/ReferenceData/ModifyAddressLabel`, { ...data })
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getAddressLabelsJobs() {
        return this.httpClient
            .get<IDataAdminAddressLabelJobResponse>(
                '/mocks/dataAdminAddressLabelsJobs.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getMethodDefinitions(params) {
        return this.httpClient
            .get<IDataAdminMethodDefinitionsResponse>(
                `${this.baseUrl}/ReferenceData/GetMethodDefinition`,
                {
                    params
                }
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    createMethodDefinitions(data: ICreateAdminMethodDefinitionData) {
      return this.httpClient
              .post<ICreateAdminMethodDefinitionResponse>(
                `${this.baseUrl}/ReferenceData/AddMethodDefinition`, data
              ).pipe((response) => response)
    }

    getProviders() {
        return this.httpClient
            .get<IDataAdminProviderResponse>(
                '/mocks/dataAdminMarketDataProviders.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getProvidersJobs() {
        return this.httpClient
            .get<IDataAdminProviderJobResponse>(
                '/mocks/dataAdminMarketDataProvidersJobs.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getCurrencyPairs(params) {
        return this.httpClient
            .get<IDataAdminCurrencyPairResponse>(
                `${this.baseUrl}/MarketData/GetMissingCurrencyPairs`, { params }
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getCurrencyPairDependencies(params) {
        return this.httpClient
                .get<IDataAdminCurrencyPairDependencyResponse>(
                    `${this.baseUrl}/MarketData/GetExchangePairDependencies`, { params }
                ).pipe((response) => response);
    }

    getCurrencyPairUsage(params) {
        return this.httpClient
                .get<IDataAdminCurrencyPairUsageResponse>(
                    `${this.baseUrl}/MarketData/GetExchangePairUsage`, { params }
                ).pipe((response) => response);
    }

    getCurrencyPairsJobs() {
        return this.httpClient
            .get<IDataAdminCurrencyPairJobResponse>(
                '/mocks/dataAdminCurrencyPairsJobs.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getCurrencyPairsProcessingJobs() {
        return this.httpClient
            .get<IDataAdminCurrencyPairProcessingJobResponse>(
                '/mocks/dataAdminCurrencyPairsProcessingJobs.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getCurrencyPairsMarketToMarket(params) {
        return this.httpClient
            .get<IDataAdminCurrencyPairMarketToMarketResponse>(
                `${this.baseUrl}/ReferenceData/GetMarketToMarketExchangePair`,
                { params }
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getListCoins() {
        return this.httpClient
            .get<IListCoinsResponse>(
                '/mocks/listCoins.json',
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }
}
