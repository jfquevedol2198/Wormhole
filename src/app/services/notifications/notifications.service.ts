import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    INotificationsResponse,
    INotificationsData,
    INotificationsFilters,
    INotificationsModifiedRequest,
} from '../../interfaces/notifications.interface';
import { IPaginationParams } from '../../interfaces/paginationParams.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { ApiService } from '../api/api.service';
import { getSeverityChips } from './helpers';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    totalNotifications$ = new BehaviorSubject<string>('0');

    constructor(private readonly api: ApiService) {}

    getNotifications(
        paginationParams: IPaginationParams,
        sorting: string[],
        notificationsFilters: INotificationsFilters,
    ): Observable<INotificationsData> {
        const params = convertParamsForRequests({
            getRecordCount: true,
            getRecords: true,
            hidden: false,
            paginationParams,
            sorting,
            notificationsFilters,
        });

        return this.api
            .get<INotificationsResponse>('Accounting/GetNotifications', params)
            .pipe(
                map((response) => {
                    const notifications = response.records.map(
                        (notification) => ({
                            ...notification,
                            isNotificationSelected: false,
                            severity: notification.severity.toLowerCase(),
                            chips: [getSeverityChips(notification.severity)],
                            workerName: JSON.parse(notification.details)
                                .WorkerName,
                        }),
                    );

                    return {
                        data: notifications,
                        total: response.recordCount,
                        pageIndex: paginationParams.pageIndex,
                        pageSize: paginationParams.pageSize,
                        sorting,
                        filters: notificationsFilters,
                    };
                }),
            );
    }

    markNotificationsAsRead(notificationIds: number[]) {
        const params = {
            notificationIds,
            dismissed: true,
        };
        return this.modifyNotification(params);
    }

    removeNotifications(notificationIds: number[]) {
        const params = {
            notificationIds,
            hide: true,
        };
        return this.modifyNotification(params);
    }

    modifyNotification(params: INotificationsModifiedRequest) {
        return this.api.put<INotificationsResponse>(
            'Accounting/ModifyNotification',
            params,
        );
    }

    getTotalNotifications(): Observable<number> {
        const params = convertParamsForRequests({ getRecordCount: true });
        return this.api
            .get<INotificationsResponse>('Accounting/GetNotifications', params)
            .pipe(map((data) => data.recordCount));
    }

    setTotalNotifications(total: string): void {
        this.totalNotifications$.next(total);
    }
}
