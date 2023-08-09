import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    IHealthCheckResponse,
    IGetVersionResponse,
} from '../../interfaces/healthCheck.interface';
import {
    ILogEvent,
    ILogEventResponse,
} from '../../interfaces/logEvent.interface';
import {
    ISetting,
    ISettingsResponse,
    IUpdateSettingFields,
} from '../../interfaces/setting.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { getChipsDataForServiceHealthCheck } from '../../utilities/getChipsDataForServiceHealthCheck';
import { ApiService } from '../api/api.service';

@Injectable()
export class WormholeService {
    accountId = 1;

    constructor(private readonly api: ApiService) {}

    getLogLevel(): Observable<string> {
        return this.api.get<string>('Service/GetLogLevel');
    }

    changeLogLevel(level: string) {
        this.api
            .put<string>(`Service/ChangeLogLevel?logLevel=${level}`, null)
            .subscribe();
    }

    getSettings(): Observable<ISetting[]> {
        const params = convertParamsForRequests({ accountId: this.accountId });
        return this.api
            .get<ISettingsResponse>('Service/GetSettings', params)
            .pipe(map((response) => response.records));
    }

    updateSetting(setting: IUpdateSettingFields) {
        this.api.put('Service/UpdateSetting', setting).subscribe();
    }

    getHealthCheck(): Observable<IHealthCheckResponse> {
        return this.api
            .get<IHealthCheckResponse>('Service/GetHealthCheck')
            .pipe(
                map((healthCheck) => ({
                    ...healthCheck,
                    healthcheck: {
                        ...healthCheck.healthcheck,
                        servicesHealthcheck:
                            healthCheck.healthcheck.servicesHealthcheck.map(
                                (serviceHealthcheck) => {
                                    return {
                                        ...serviceHealthcheck,
                                        chips: getChipsDataForServiceHealthCheck(
                                            serviceHealthcheck.metrics,
                                        ),
                                        availabilityIcon:
                                            serviceHealthcheck.availability ===
                                            'Stopped'
                                                ? 'block'
                                                : serviceHealthcheck.availability ===
                                                  'Running'
                                                ? 'cached'
                                                : serviceHealthcheck.availability ===
                                                  'PerRequest'
                                                ? 'hourglass_empty'
                                                : '',
                                    };
                                },
                            ),
                    },
                })),
            );
    }

    getExceptions(): Observable<ILogEvent[]> {
        return this.api
            .get<ILogEventResponse>('Service/GetExceptions')
            .pipe(map((response) => response.logEvents));
    }

    getVersion(): Observable<IGetVersionResponse> {
        return this.api.get<IGetVersionResponse>('Service/GetVersion');
    }
}
