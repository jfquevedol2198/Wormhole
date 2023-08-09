import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
    IReport,
    IReportDefinitionExtended,
    IReportDefinitionResponse,
    IReportDefinitionsRecords,
    IReportForm,
} from 'src/app/interfaces/reportHistory.interface';
import { convertParamsForRequests } from 'src/app/utilities/convertParams';
import { removeEmptyValues } from 'src/app/utilities/removeEmptyValues';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { IWormholePostResponse } from '../../interfaces/response.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class ReportHistoryService {
    constructor(private readonly api: ApiService) {}
    getReportDefinitionWithForm(
        fb: FormBuilder,
        searchQuery: string = '',
    ): Observable<IReportDefinitionsRecords[]> {
        const params = convertParamsForRequests({});
        return this.api.get('Accounting/GetReportDefinitions', params).pipe(
            map((response: IReportDefinitionResponse) => {
                return response.records;
            }),
            map((data) => {
                return data.map((item) => {
                    return {
                        ...item,
                        isEdited: false,
                        formGroup: fb.group({
                            name: item.name,
                            description: item.description,
                            schedule: item.schedule,
                        }),
                        reportDefinitionItems: [],
                        isExpanded: false,
                    };
                });
            }),
            switchMap((data) => {
                const reportDefinitionItems$: Observable<any>[] = [];
                data.forEach((item) => {
                    const item$ = this.getReports(item.reportDefinitionId);
                    reportDefinitionItems$.push(item$);
                });
                return forkJoin(reportDefinitionItems$).pipe(
                    map((forkJoinedData) => {
                        return data
                            .map((item) => {
                                const items = forkJoinedData.find(
                                    (forkJoinedDataItem) =>
                                        forkJoinedDataItem.length > 0 &&
                                        forkJoinedDataItem[0]
                                            .reportDefinitionId ===
                                            item.reportDefinitionId,
                                );

                                return {
                                    ...item,
                                    reportDefinitionItems: !items ? [] : items,
                                    isExpanded: !items,
                                };
                            })
                            .filter((item) =>
                                item.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()),
                            );
                    }),
                );
            }),
        );
    }
    addReportDefinition(
        reportForm: IReportForm,
    ): Observable<IWormholePostResponse> {
        const formWithoutEmptyValues = removeEmptyValues(reportForm);
        return this.api.post(
            'Accounting/AddReportDefinition',
            formWithoutEmptyValues,
        );
    }

    getReportsAfterAdding(
        reportForm: IReportForm,
        fb: FormBuilder,
    ): Observable<IReportDefinitionsRecords[]> {
        return this.addReportDefinition(reportForm).pipe(
            switchMap(() => {
                return this.getReportDefinitionWithForm(fb);
            }),
        );
    }
    modifyReportDefinition(report: IReportDefinitionExtended, fb: FormBuilder) {
        const params = {
            reportPresetId: report.reportPresetId,
            reportDefinitionId: report.reportDefinitionId,
            name: report.formGroup.value.name,
            description: report.formGroup.value.description,
            schedule: report.formGroup.value.schedule,
        };
        return this.api.put('Accounting/ModifyReportDefinition', params).pipe(
            switchMap(() => {
                return this.getReportDefinitionWithForm(fb);
            }),
        );
    }
    getReports(reportDefinitionId: number): Observable<IReport[]> {
        const params = convertParamsForRequests({
            reportDefinitionId,
        });

        return this.api.get('Accounting/GetReports', params).pipe(
            map((response: any) => {
                return response.records;
            }),
        );
    }
    downloadReportFile(reportId: number) {
        const params = convertParamsForRequests({
            reportId,
        });
        return this.api.getWithNoJson('Accounting/DownloadReportFile', params);
    }

    removeReportDefinition(id: number) {
        const params = {
            reportDefinitionId: id,
        };
        return this.api.delete('Accounting/RemoveReportDefinition', params);
    }
}
