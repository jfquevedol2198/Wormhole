import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { notificationsColumns } from 'src/app/views/wormhole/wormhole-notifications/notifications-columns';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TOOLTIP_DEFAULT_PROPS } from '../../../components/app-tooltip/app-tooltip.component';
import {
    ICombinedNotificationsData,
    INotification,
    INotificationsData,
    INotificationsFilters,
} from '../../../interfaces/notifications.interface';
import {
    ISortColumn,
    SortDirection,
} from '../../../interfaces/sort-column.interface';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { momentToUtcFormat } from '../../../utilities/date-time';
import { getSortQuery } from '../../../utilities/getSortQuery';

export class NotificationsData implements INotificationsData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    sorting = ['dismissed asc'];
    total = 0;
    filters = {};
}

@Component({
    selector: 'app-wormhole-notifications',
    templateUrl: './wormhole-notifications.component.html',
    styleUrls: ['./wormhole-notifications.component.scss'],
})
export class WormholeNotificationsComponent implements OnInit, OnDestroy {
    public filtersForm: FormGroup;

    notificationsData: INotificationsData = new NotificationsData();
    subscriptions = new Subscription();

    isNotificationsLoading = true;

    columns = notificationsColumns;
    displayedColumns: string[] = [];
    sortColumns: ISortColumn[] = [];

    tippyProps = TOOLTIP_DEFAULT_PROPS;

    constructor(
        private notificationsService: NotificationsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private readonly fb: FormBuilder,
    ) {
        this.filtersForm = this.fb.group({
            fromDate: [{ value: '', disabled: true }, []],
            toDate: [{ value: '', disabled: true }, []],
            severity: ['', []],
            type: ['', []],
        });
    }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map((column) => column.columnDef);

        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    map((queryParams) => [
                        queryParams.pageIndex ? +queryParams.pageIndex : 0,
                        queryParams.pageSize ? +queryParams.pageSize : 50,
                        queryParams.notificationsSorting
                            ? JSON.parse(queryParams.notificationsSorting)
                            : ['dismissed asc'],
                        queryParams.notificationsFilters
                            ? JSON.parse(queryParams.notificationsFilters)
                            : {},
                    ]),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isNotificationsLoading = true)),
                    map(
                        ([
                            pageIndex,
                            pageSize,
                            sorting,
                            notificationsFilters,
                        ]): ICombinedNotificationsData => {
                            return {
                                paginationParams: {
                                    pageIndex,
                                    pageSize,
                                },
                                sorting,
                                filters: notificationsFilters,
                            };
                        },
                    ),
                    switchMap((data) =>
                        this.notificationsService.getNotifications(
                            data.paginationParams,
                            data.sorting,
                            data.filters,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.notificationsData = data;
                    this.setFormControls(data.filters);
                    this.sortColumns = data.sorting.map((column) => {
                        return {
                            columnDef: column.split(' ')[0],
                            direction: column.split(' ')[1] as SortDirection,
                        };
                    });
                    this.isNotificationsLoading = false;
                }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    setFormControls(filters: INotificationsFilters) {
        this.filtersForm.controls.severity.setValue(filters.severity);
        this.filtersForm.controls.type.setValue(filters.type);
        this.filtersForm.controls.fromDate.setValue(filters.fromDate);
        this.filtersForm.controls.toDate.setValue(filters.toDate);
    }

    filterNotifications() {
        this.router.navigate([], {
            queryParams: {
                notificationsFilters: this.getFilteringParams(),
                pageIndex: 0,
            },
            queryParamsHandling: 'merge',
        });
    }

    getFilteringParams() {
        return JSON.stringify({
            fromDate: this.filtersForm.controls.fromDate.value
                ? momentToUtcFormat(
                      moment(this.filtersForm.controls.fromDate.value),
                  )
                : undefined,
            toDate: this.filtersForm.controls.toDate.value
                ? momentToUtcFormat(
                      moment(this.filtersForm.controls.toDate.value),
                  )
                : undefined,
            severity:
                this.filtersForm.controls.severity.value &&
                this.filtersForm.controls.severity.value !== 'None'
                    ? this.filtersForm.controls.severity.value
                    : undefined,
            type:
                this.filtersForm.controls.type.value &&
                this.filtersForm.controls.type.value !== 'None'
                    ? this.filtersForm.controls.type.value
                    : undefined,
        });
    }

    markSelectedNotificationAsRead() {
        const selectedNotificationIds = [];
        this.notificationsData.data.forEach((notification) => {
            if (notification.isNotificationSelected) {
                selectedNotificationIds.push(notification.notificationId);
            }
        });
        this.notificationsService
            .markNotificationsAsRead(selectedNotificationIds)
            .subscribe(() => {
                this.notificationsData.data.forEach((notification) => {
                    if (
                        selectedNotificationIds.some(
                            (id) => id === notification.notificationId,
                        )
                    ) {
                        notification.dismissed = true;
                    }
                });
            });
    }

    removeSelectedNotifications() {
        this.isNotificationsLoading = true;
        const selectedNotificationIds = [];
        this.notificationsData.data.forEach((notification) => {
            if (notification.isNotificationSelected) {
                selectedNotificationIds.push(notification.notificationId);
            }
        });
        this.removeNotifications(selectedNotificationIds);
    }

    onReadNotificationClick(notification: INotification, checked: boolean) {
        this.notificationsService
            .modifyNotification({
                notificationIds: [notification.notificationId],
                dismissed: !checked,
            })
            .subscribe(() => {
                notification.dismissed = !notification.dismissed;
            });
    }

    onDeleteNotificationClick(notificationId: number) {
        this.isNotificationsLoading = true;
        this.removeNotifications([notificationId]);
    }

    removeNotifications(notificationIds: number[]) {
        this.notificationsService
            .removeNotifications(notificationIds)
            .pipe(
                switchMap((data) =>
                    this.notificationsService.getNotifications(
                        {
                            pageIndex: this.notificationsData.pageIndex,
                            pageSize: this.notificationsData.pageSize,
                        },
                        this.notificationsData.sorting,
                        this.notificationsData.filters,
                    ),
                ),
            )
            .subscribe((data) => {
                this.notificationsData = data;
                this.isNotificationsLoading = false;
            });
    }

    sort(isButtonPressed: boolean, columnDef: string) {
        const sortQuery = getSortQuery(
            isButtonPressed,
            columnDef,
            this.sortColumns,
        );

        this.sortColumns = sortQuery.sortColumns;

        this.router.navigate([], {
            queryParams: {
                notificationsSorting: sortQuery.sortQuery,
            },
            queryParamsHandling: 'merge',
        });
    }

    onSelectAllClick(): void {
        if (
            this.notificationsData.data.some(
                (notification) => !notification.isNotificationSelected,
            )
        ) {
            this.notificationsData.data.forEach((notification) => {
                notification.isNotificationSelected = true;
            });
        } else {
            this.notificationsData.data.forEach((notification) => {
                notification.isNotificationSelected = false;
            });
        }
    }

    page(pageIndex: number, pageSize: number) {
        this.router.navigate([], {
            queryParams: {
                pageIndex,
                pageSize,
            },
            queryParamsHandling: 'merge',
        });
    }

    areSelectedNotifications() {
        return this.notificationsData.data.some(
            (notification) => notification.isNotificationSelected === true,
        );
    }

    onResetFiltersClick() {
        this.router.navigate([], {
            queryParams: {
                notificationsFilters: undefined,
                pageIndex: 0,
            },
            queryParamsHandling: 'merge',
        });
    }

    areFiltersSelected() {
        return Object.keys(this.notificationsData.filters).length !== 0;
    }

    redirect(notification: INotification) {
        if (notification.type === 'WorkerTasks') {
            if (notification.workerName === 'ReportGenerator') {
                this.router.navigate(['/app/analytics'], {
                    queryParamsHandling: 'merge',
                });
            } else if (notification.workerName === 'ProfitAndLoss') {
                this.router.navigate(['/app/processing'], {
                    queryParamsHandling: 'merge',
                });
            } else {
                this.router.navigate(['/app/settings'], {
                    queryParamsHandling: 'merge',
                });
            }
        }
    }
}
