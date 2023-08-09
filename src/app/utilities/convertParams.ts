import moment from 'moment';

import { IParam } from '../interfaces/params.interface';

export const convertParamsForRequests = (parameters: any): IParam[] => {
    const params: IParam[] = [];

    if (parameters.accountingModels) {
        params.push({
            name: 'AccountingModels',
            value: parameters.accountingModels,
        });
    }
    if (parameters.accountId) {
        params.push({
            name: 'AccountId',
            value: parameters.accountId,
        });
    }
    if (parameters.reportDefinitionId) {
        params.push({
            name: 'ReportDefinitionId',
            value: parameters.reportDefinitionId,
        });
    }
    if (parameters.profitAndLossScheduleId) {
        params.push({
            name: 'ProfitAndLossScheduleId',
            value: parameters.profitAndLossScheduleId,
        });
    }
    if (parameters.reportId) {
        params.push({
            name: 'ReportId',
            value: parameters.reportId,
        });
    }

    if (parameters.portfolioId) {
        params.push({
            name: 'PortfolioId',
            value: parameters.portfolioId,
        });
    }

    if (parameters.fromDate) {
        params.push({
            name: 'FromDate',
            value: new Date(parameters.fromDate).getTime() / 1000,
        });
    }

    if (parameters.fromMomentDate) {
        params.push({
            name: 'FromDate',
            value: parameters.fromMomentDate.unix(),
        });
    }

    if (parameters.toDate) {
        params.push({
            name: 'ToDate',
            value: new Date(parameters.toDate).getTime() / 1000,
        });
    }

    if (parameters.date) {
        params.push({
            name: 'Date',
            value: new Date(parameters.date).getTime() / 1000,
        });
    }

    if (parameters.toMomentDate) {
        params.push({
            name: 'ToDate',
            value: parameters.fromMomentDate.unix(),
        });
    }

    if (parameters.paginationParams) {
        params.push(
            {
                name: 'PageIndex',
                value: parameters.paginationParams.pageIndex + 1, // The wormhole API accepts pageIndex from 1, not from 0 as matPaginator
            },
            {
                name: 'PageSize',
                value: parameters.paginationParams.pageSize,
            },
        );
    }

    if (parameters.schedule) {
        params.push({
            name: 'Schedule',
            value: parameters.schedule,
        });
    }
    if (parameters.transactionId) {
        params.push({
            name: 'TransactionId',
            value: parameters.transactionId,
        });
    }

    if (parameters.walletAddress) {
        params.push({
            name: 'WalletAddress',
            value: parameters.walletAddress,
        });
    }

    if (parameters.exchangeRatePairId) {
        params.push({
            name: 'ExchangeRatePairId',
            value: parameters.exchangeRatePairId,
        });
    }

    if (parameters.name) {
        params.push({
            name: 'Name',
            value: parameters.name,
        });
    }

    if (parameters.getRecordCount) {
        params.push({
            name: 'GetRecordCount',
            value: parameters.getRecordCount,
        });
    }

    if (parameters.getRecords) {
        params.push({
            name: 'GetRecords',
            value: parameters.getRecords,
        });
    }

    if (parameters.sorting) {
        if (Array.isArray(parameters.sorting)) {
            parameters.sorting.map((sorting) => {
                params.push({
                    name: 'Sorting',
                    value: sorting,
                });
            });
        } else {
            params.push({
                name: 'Sorting',
                value: parameters.sorting,
            });
        }
    }

    if (parameters.address) {
        params.push({
            name: 'Address',
            value: parameters.address,
        });
    }
    if (parameters.persistence) {
        params.push({
            name: 'Persistence',
            value: parameters.persistence,
        });
    }
    if (parameters.scope) {
        params.push({
            name: 'Scope',
            value: parameters.scope,
        });
    }
    if (parameters.userAccountId) {
        params.push({
            name: 'UserAccountId',
            value: parameters.userAccountId,
        });
    }

    if (parameters.operationId) {
        params.push({
            name: 'OperationId',
            value: parameters.operationId,
        });
    }
    if (parameters.processingJobsFilters) {
        if (parameters.processingJobsFilters.sessionId) {
            params.push({
                name: 'SessionId',
                value: parameters.processingJobsFilters.sessionId,
            });
        }
        if (parameters.processingJobsFilters.workerName) {
            params.push({
                name: 'WorkerName',
                value: parameters.processingJobsFilters.workerName,
            });
        }

        if (parameters.processingJobsFilters.taskStates) {
            params.push({
                name: 'TaskStates',
                value: parameters.processingJobsFilters.taskStates,
            });
        }

        if (parameters.processingJobsFilters.enabled) {
            params.push({
                name: 'Enabled',
                value: parameters.processingJobsFilters.enabled,
            });
        }
        if (parameters.processingJobsFilters.workerTaskIds) {
            params.push({
                name: 'WorkerTaskIds',
                value: parameters.processingJobsFilters.workerTaskIds,
            });
        }
    }

    if (parameters.workerTaskId) {
        params.push({
            name: 'WorkerTaskId',
            value: parameters.workerTaskId,
        });
    }
    if (parameters.removeLock) {
        params.push({
            name: 'RemoveLock',
            value: parameters.removeLock,
        });
    }
    if (parameters.state) {
        params.push({
            name: 'State',
            value: parameters.state,
        });
    }
    if ('hidden' in parameters) {
        params.push({
            name: 'Hidden',
            value: parameters.hidden,
        });
    }
    if (parameters.workerNames) {
        params.push({
            name: 'WorkerNames',
            value: parameters.workerNames,
        });
    }
    if (parameters.taskTypes) {
        params.push({
            name: 'TaskTypes',
            value: parameters.taskTypes,
        });
    }

    if (parameters.notificationsFilters) {
        if (parameters.notificationsFilters.fromDate) {
            params.push({
                name: 'FromDate',
                value: moment
                    .utc(parameters.notificationsFilters.fromDate)
                    .local()
                    .unix(),
            });
        }

        if (parameters.notificationsFilters.toDate) {
            params.push({
                name: 'ToDate',
                value: moment
                    .utc(parameters.notificationsFilters.toDate)
                    .local()
                    .unix(),
            });
        }

        if (parameters.notificationsFilters.severity) {
            params.push({
                name: 'Severity',
                value: parameters.notificationsFilters.severity,
            });
        }

        if (parameters.notificationsFilters.type) {
            params.push({
                name: 'Type',
                value: parameters.notificationsFilters.type,
            });
        }
    }

    if (parameters.blockNumberRange) {
        params.push({
            name: 'StartBlock',
            value: parameters.blockNumberRange.left as number,
        });

        params.push({
            name: 'EndBlock',
            value: parameters.blockNumberRange.right as number,
        });
    }

    return params;
};
