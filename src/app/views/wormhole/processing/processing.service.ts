import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginationParams } from 'src/app/interfaces/paginationParams.interface';
import {
    IProcessingJobsFilters,
    IProcessingJobsReponse,
    IAddProfitAndLossDefinition,
    IAddProfitAndLossSchedule,
    IAddProfitAndLossScheduleForm,
    IAddProfitAndLossScheduleResponse,
    IModifyProfitAndLossDefinition,
    IProfitAndLossDefinitionResponse,
    IProfitAndLossScheduleResponse,
    IProcessingJob,
} from 'src/app/interfaces/processing-jobs.interface';
import { IPNLAddressLabelResponse, IPNLMethodDefinitionResponse, IPNLMissingCurrencyPairs, IPNLMissingCurrencyPairsResponse, IPNLReportMessagesResponse, IPNLTransactionReportMessageResponse, IProcessingProfitAndLossData } from 'src/app/interfaces/processingProfitAndLoss.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { convertParamsForRequests } from 'src/app/utilities/convertParams';
import { getStatusChip } from 'src/app/utilities/getStatusChip';

import { Injectable } from '@angular/core';

export class ProcessingProfitAndLossData
    implements IProcessingProfitAndLossData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = ['createdDate asc'];
}

export class ProcessingJobs implements IProcessingProfitAndLossData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = ['createdDate asc'];
    filters = {
        sessionId: undefined,
        instanceName: undefined,
        taskStates: undefined,
        enabled: undefined,
        workerTaskIds: undefined,
    };
}

@Injectable({ providedIn: 'root' })
export class ProcessingService {
    processingProfitAndLoss$: BehaviorSubject<ProcessingProfitAndLossData> =
        new BehaviorSubject(new ProcessingProfitAndLossData());
    isProcessingProfitAndLossDataLoading = true;
    userAccountId = 1;
    processingJobActions = ['Processing logs', 'Run now', 'Remove lock'];
    constructor(private api: ApiService) { }

    getProfitAndLossSchedule(filters) {
        const { portfolioId, userAccountId, schedule, pricingCurve, accountingModels } = filters;
        const parameters = convertParamsForRequests({
            portfolioId,
            userAccountId,
            schedule,
            pricingCurve,
            accountingModels,
        });
        return this.api.get<IProfitAndLossScheduleResponse>(
            'Accounting/GetProfitAndLossSchedule',
            parameters,
        );
    }

    prepareAddingScheduleRequest(
        obj: IAddProfitAndLossScheduleForm,
    ): IAddProfitAndLossSchedule {
        let model;
        if (obj.cashBasedModel === '' && obj.tokenBasedModel === '') {
            model = 'None';
        } else if (
            obj.cashBasedModel === 'true' &&
            obj.tokenBasedModel === ''
        ) {
            model = 'DollarBased';
        } else if (
            obj.cashBasedModel === '' &&
            obj.tokenBasedModel === 'true'
        ) {
            model = 'TokenBased';
        } else {
            model = 'TokenBased, DollarBased';
        }

        return {
            portfolioId: obj.portfolioId.value,
            userAccountId: this.userAccountId,
            schedule: obj.schedule,
            accountingModels: model,
            pricingCurveId: obj.pricingCurve,
        };
    }
    addProfitAndLossSchedule(obj) {
        const parameters = this.prepareAddingScheduleRequest(obj);
        return this.api.post<IAddProfitAndLossScheduleResponse>(
            'Accounting/AddProfitAndLossSchedule',
            parameters,
        );
    }
    getProfitAndLossDefinitionAction(definition) {
        let action;
        let isToggleDisabled;
        let isSpeedUpEnabled;
        if (definition.draft && definition.progressPercentage === 0) {
            action = 'Schedule';
            isToggleDisabled = false;
            isSpeedUpEnabled = false;
        } else if (
            !definition.draft &&
            definition.progressPercentage > 0 &&
            definition.progressPercentage < 1
        ) {
            action = 'Stop';
            isToggleDisabled = false;
            isSpeedUpEnabled = true;
        } else if (!definition.draft && definition.progressPercentage === 1) {
            action = 'Refresh';
            isToggleDisabled = true;
            isSpeedUpEnabled = true;
        }
        return {
            action,
            isToggleDisabled,
            isSpeedUpEnabled,
        };
    }
    getProfitAndLossDefinition(profitAndLossScheduleId: number) {
        const parameters = convertParamsForRequests({
            profitAndLossScheduleId,
        });
        return this.api
            .get<IProfitAndLossDefinitionResponse>(
                'Accounting/GetProfitAndLossDefinition',
                parameters,
            )
            .pipe(
                map((data) => data.records),
                map((data) => {
                    return data.map((item) => {
                        const { action, isToggleDisabled, isSpeedUpEnabled } =
                            this.getProfitAndLossDefinitionAction(item);
                        return {
                            ...item,
                            action,
                            isToggleDisabled,
                            isSpeedUpEnabled,
                        };
                    });
                }),
            );
    }
    getJobActionBasedOnParams(job, actionsArray) {
        if (job.agentId || job.lockTimestamp) {
            return [...actionsArray, 'Remove lock'];
        }
        return actionsArray;
    }

    getJobAction(job: IProcessingJob) {
        const actionsArray = ['Processing Logs'];
        if (
            job.state === 'Failed' ||
            job.state === 'Terminated' ||
            job.state === 'Aborted'
        ) {
            actionsArray.push('Re-run');
        } else if (job.state === 'Running') {
            actionsArray.push('Stop');
        }

        return this.getJobActionBasedOnParams(job, actionsArray);
    }

    getToggleState(job: IProcessingJob) {
        if (
            job.state === 'Failed' ||
            job.state === 'Terminated' ||
            job.state === 'Aborted' ||
            job.state === 'Scheduled'
        ) {
            return false;
        }
        return true;
    }
    getWorkerTasks(
        paginationParams: IPaginationParams,
        sorting: string[],
        processingJobsFilters: IProcessingJobsFilters,
    ) {
        const taskTypes = 'Slave';
        const workerNames = 'ProfitAndLoss';

        const params = convertParamsForRequests({
            getRecordCount: true,
            getRecords: true,
            paginationParams,
            sorting,
            processingJobsFilters,
            taskTypes,
            workerNames,
        });

        return this.api
            .get<IProcessingJobsReponse>('Workers/GetWorkerTasks', params)
            .pipe(
                map((response) => {
                    const processingJobs = response.records.map((item) => ({
                        ...item,
                        isToggled: item.enabled,
                        actions: this.getJobAction(item),
                        chips: [getStatusChip(item.state)],
                        isToggleDisabled: this.getToggleState(item),
                        task: JSON.parse(JSON.stringify(item.taskParameters)),
                    }));
                    return {
                        processingJobs,
                        total: response.recordCount,
                        pageIndex: paginationParams.pageIndex,
                        pageSize: paginationParams.pageSize,
                        sorting,
                        filters: processingJobsFilters,
                    };
                }),
            );
    }

    modifySlaveTasks(params) {
        const parameters = convertParamsForRequests({
            workerTaskId: params.workerTaskId,
            state: params.state,
            enabled: params.enabled,
            removeLock: params.removeLock,
        });
        return this.api.get<IProcessingJobsReponse>(
            'Workers/ModifySlaveTasks',
            parameters,
        );
    }

    interruptRunningTask(workerTaskId: number) {
        return this.api.put<IProcessingJobsReponse>(
            'Workers/InterruptRunningTask',
            workerTaskId,
        );
    }
    addProfitAndLossDefinition(obj: IAddProfitAndLossDefinition) {
        return this.api.post('Accounting/AddProfitAndLossDefinition', obj);
    }
    modifyProfitAndLossDefinition(obj: IModifyProfitAndLossDefinition) {
        return this.api.put('Accounting/ModifyProfitAndLossDefinition', obj);
    }

    getMethodDefinitions(obj) {
        return this.api
            .get<IPNLMethodDefinitionResponse>(
                'ReferenceData/GetMethodDefinition',
                obj
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getTransactionReportMessages(obj) {
        return this.api
            .get<IPNLTransactionReportMessageResponse>(
                'DataQualityCheck/GetTransactionReportMessages',
                obj
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getMissingCurrencyPairs(obj) {
        return this.api
            .get<IPNLMissingCurrencyPairsResponse>(
                'MarketData/GetMissingCurrencyPairs',
                obj
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getAddressLabel(obj) {
        return this.api
            .get<IPNLAddressLabelResponse>(
                'ReferenceData/GetAddressLabel',
                obj
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }

    getPNLReportMessages(obj) {
        return this.api
            .get<IPNLReportMessagesResponse>(
                'DataQualityCheck/GetProfitAndLossReportMessages',
                obj
            )
            .pipe(
                map((response) => {
                    return response;
                }),
            );
    }
}
