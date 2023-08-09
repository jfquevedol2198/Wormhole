import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    IOperationAudit,
    IOperationAuditsResponse,
} from '../../interfaces/operationAudit.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { ApiService } from '../api/api.service';

const MAX_RECORDS = 10000000;

@Injectable()
export class AuditService {
    constructor(private readonly api: ApiService) {}

    getOperationAudits(transactionId: number): Observable<IOperationAudit[]> {
        const params = convertParamsForRequests({
            transactionId,
            paginationParams: {
                pageIndex: 0,
                pageSize: MAX_RECORDS,
            },
            getRecords: true,
        });

        return this.api
            .get<IOperationAuditsResponse>('Audit/GetOperationAudits', params)
            .pipe(
                map((response) =>
                    response.records.map((operationAudit) => {
                        return {
                            ...operationAudit,
                            date: moment.utc(operationAudit.timestamp).local(),
                        };
                    }),
                ),
            );
    }
}
