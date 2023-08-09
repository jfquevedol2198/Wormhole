import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
    ICombinedProcessingJobsData,
    IProcessingJobsColumn,
    IProcessingJobsFilters,
} from 'src/app/interfaces/processing-jobs.interface';
import {
    ISortColumn,
    SortDirection,
} from 'src/app/interfaces/sort-column.interface';
import { getSortQuery } from 'src/app/utilities/getSortQuery';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProcessingJobs, ProcessingService } from '../processing.service';
import { processingJobsColumns } from './processing-jobs.columns';

@Component({
    selector: 'app-processing-jobs',
    templateUrl: './processing-jobs.component.html',
    styleUrls: ['./processing-jobs.component.scss'],
})
export class ProcessingJobsComponent implements OnInit {
    processingJobsData: ProcessingJobs = new ProcessingJobs();

    defaultSortingColumn: string;
    defaultSortingOrder: string;

    isProcessingJobsDataLoading = true;
    paginationDisabled = false;

    defaultPageSize = 50;
    defaultPageIndex = 0;

    subscriptions = new Subscription();

    columns: IProcessingJobsColumn[] = processingJobsColumns;
    displayedColumns: string[] = [];
    sortColumns: ISortColumn[] = [];

    public filtersForm: FormGroup;
    constructor(
        public processingService: ProcessingService,
        private readonly fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.filtersForm = this.fb.group({
            taskStates: '',
            instanceName: '',
            selectBy: [{ value: '', disabled: true }],
            blockStartHeight: [{ value: '', disabled: true }],
            blockEndHeight: [{ value: '', disabled: true }],
            enabled: '',
            sessionId: '',
            workerTaskIds: '',
        });
    }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map((column) => column.columnDef);

        this.subscriptions.add(
            this.activatedRoute.queryParams
                .pipe(
                    tap(() => (this.isProcessingJobsDataLoading = true)),
                    map((queryParams) => [
                        queryParams.pageIndex ? +queryParams.pageIndex : 0,
                        queryParams.pageSize ? +queryParams.pageSize : 50,
                        queryParams.processingJobsSorting
                            ? JSON.parse(queryParams.processingJobsSorting)
                            : [],
                        queryParams.processingJobsFilters
                            ? JSON.parse(queryParams.processingJobsFilters)
                            : {},
                    ]),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isProcessingJobsDataLoading = true)),
                    map(
                        ([
                            pageIndex,
                            pageSize,
                            sorting,
                            processingJobsFilters,
                        ]): ICombinedProcessingJobsData => {
                            return {
                                paginationParams: {
                                    pageIndex,
                                    pageSize,
                                },
                                sorting,
                                filters: processingJobsFilters,
                            };
                        },
                    ),
                    switchMap((data) =>
                        this.processingService.getWorkerTasks(
                            data.paginationParams,
                            data.sorting,
                            data.filters,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.processingJobsData = {
                        ...this.processingJobsData,
                        data: data.processingJobs,
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        sorting: data.sorting,
                        filters: data.filters,
                    };
                    this.setFormControls(data.filters);
                    this.sortColumns = data.sorting.map((column) => {
                        return {
                            columnDef: column.split(' ')[0],
                            direction: column.split(' ')[1] as SortDirection,
                        };
                    });
                    this.isProcessingJobsDataLoading = false;
                }),
        );
    }

    setFormControls(filters: IProcessingJobsFilters) {
        this.filtersForm.controls.sessionId.setValue(filters.sessionId);
        this.filtersForm.controls.instanceName.setValue(filters.instanceName);
        this.filtersForm.controls.taskStates.setValue(filters.taskStates);
        this.filtersForm.controls.enabled.setValue(filters.enabled);
        this.filtersForm.controls.workerTaskIds.setValue(filters.workerTaskIds);
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
                processingJobsSorting: sortQuery.sortQuery,
            },
            queryParamsHandling: 'merge',
        });
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

    getFilteringParams() {
        return JSON.stringify({
            enabled: this.filtersForm.controls.enabled.value
                ? this.filtersForm.controls.enabled.value
                : undefined,
            instanceName:
                this.filtersForm.controls.instanceName.value &&
                this.filtersForm.controls.instanceName.value !== 'None'
                    ? this.filtersForm.controls.instanceName.value
                    : undefined,
            taskStates:
                this.filtersForm.controls.taskStates.value &&
                this.filtersForm.controls.taskStates.value !== 'None'
                    ? this.filtersForm.controls.taskStates.value
                    : undefined,
            sessionId:
                this.filtersForm.controls.sessionId.value &&
                this.filtersForm.controls.sessionId.value !== 'None'
                    ? this.filtersForm.controls.sessionId.value
                    : undefined,
            workerTaskIds:
                this.filtersForm.controls.workerTaskIds.value &&
                this.filtersForm.controls.workerTaskIds.value !== 'None'
                    ? this.filtersForm.controls.workerTaskIds.value
                    : undefined,
        });
    }

    filterProcessingJobs(filters) {
        this.router.navigate([], {
            queryParams: {
                processingJobsFilters: this.getFilteringParams(),
                pageIndex: 0,
            },
            queryParamsHandling: 'merge',
        });
    }
    selectAction(action, rowObject) {
        if (action === 'Re-run') {
            this.processingService
                .modifySlaveTasks({
                    workerTaskId: rowObject.workerTaskId,
                    state: 'Scheduled',
                    enabled: true,
                })
                .pipe(
                    tap(() => (this.isProcessingJobsDataLoading = true)),
                    switchMap((data) =>
                        this.processingService.getWorkerTasks(
                            {
                                pageIndex: this.processingJobsData.pageIndex,
                                pageSize: this.processingJobsData.pageSize,
                            },
                            this.processingJobsData.sorting,
                            this.processingJobsData.filters,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.processingJobsData = {
                        ...this.processingJobsData,
                        data: data.processingJobs,
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        sorting: data.sorting,
                        filters: data.filters,
                    };

                    this.isProcessingJobsDataLoading = false;
                });
        } else if (action === 'Stop') {
            this.processingService
                .interruptRunningTask(rowObject.row.workerTaskId)
                .pipe(
                    tap(() => (this.isProcessingJobsDataLoading = true)),
                    switchMap((data) =>
                        this.processingService.getWorkerTasks(
                            {
                                pageIndex: this.processingJobsData.pageIndex,
                                pageSize: this.processingJobsData.pageSize,
                            },
                            this.processingJobsData.sorting,
                            this.processingJobsData.filters,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.processingJobsData = {
                        ...this.processingJobsData,
                        data: data.processingJobs,
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        sorting: data.sorting,
                        filters: data.filters,
                    };

                    this.isProcessingJobsDataLoading = false;
                });
        } else if (action === 'Remove lock') {
            this.processingService
                .modifySlaveTasks({
                    workerTaskId: rowObject.workerTaskId,
                    removeLock: true,
                })
                .pipe(
                    tap(() => (this.isProcessingJobsDataLoading = true)),
                    switchMap((data) =>
                        this.processingService.getWorkerTasks(
                            {
                                pageIndex: this.processingJobsData.pageIndex,
                                pageSize: this.processingJobsData.pageSize,
                            },
                            this.processingJobsData.sorting,
                            this.processingJobsData.filters,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.processingJobsData = {
                        ...this.processingJobsData,
                        data: data.processingJobs,
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        sorting: data.sorting,
                        filters: data.filters,
                    };

                    this.isProcessingJobsDataLoading = false;
                });
        }
    }
    toggleActive(row) {
        this.processingService
            .modifySlaveTasks({
                workerTaskId: row.workerTaskId,
                enabled: !row.enabled,
            })
            .pipe(
                switchMap((data) =>
                    this.processingService.getWorkerTasks(
                        {
                            pageIndex: this.processingJobsData.pageIndex,
                            pageSize: this.processingJobsData.pageSize,
                        },
                        this.processingJobsData.sorting,
                        this.processingJobsData.filters,
                    ),
                ),
            )
            .subscribe((data) => {
                this.processingJobsData = {
                    ...this.processingJobsData,
                    data: data.processingJobs,
                    total: data.total,
                    pageIndex: data.pageIndex,
                    pageSize: data.pageSize,
                    sorting: data.sorting,
                    filters: data.filters,
                };
            });
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.router.navigate([], {
            queryParams: {
                pageIndex: undefined,
            },
            queryParamsHandling: 'merge',
        });
    }
}
