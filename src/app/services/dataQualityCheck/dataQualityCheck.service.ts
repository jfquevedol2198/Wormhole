import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    IAccountDataSummary,
    IAccountDataSummaryResponse,
    IAccountPNLProgressData,
} from 'src/app/interfaces/accountDataSummary.interface';

import { Injectable } from '@angular/core';

import { ICombinedDeFiImpactData } from '../../interfaces/deFiImpactData.interface';
import { IPaginationParams } from '../../interfaces/paginationParams.interface';
import { IPNLPriceMovementResponse } from '../../interfaces/pnlPriceMovement.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { ApiService } from '../api/api.service';

@Injectable()
export class DataQualityCheckService {
    constructor(private readonly api: ApiService) { }

    getAccountDataSummary(
        ledgerAccountId: number,
    ): Observable<IAccountDataSummary[]> {
        const params = [{ name: 'LedgerAccountId', value: ledgerAccountId }];

        return this.api
            .get<IAccountDataSummaryResponse>(
                'DataQualityCheck/GetAccountDataSummary',
                params,
            )
            .pipe(map((response) => response.records));
    }

    getPortfolioProgressData(portfolioId: number): Observable<IAccountDataSummary[]> {
        const params = [
            {
                name: 'PortfolioId',
                value: portfolioId,
            },
        ];
        return this.api
            .get<IAccountDataSummaryResponse>(
                'DataQualityCheck/GetAccountDataSummary',
                params,
            )
            .pipe(map((response) => response.records));
    }

    getPNLProgress(
        ledgerAccountId: number,
    ): Observable<IAccountPNLProgressData> {
        const params = [{ name: 'LedgerAccountId', value: ledgerAccountId }];

        return this.api
            .get<IAccountDataSummaryResponse>(
                'DataQualityCheck/GetAccountDataSummary',
                params,
            )
            .pipe(
                map((response) => {
                    const pnlProgress = response.records.filter(
                        (record) => record.category === 'Profit and Loss',
                    )[0];

                    return {
                        syncPercentage: pnlProgress.syncPercentage,
                        syncTimestamp: pnlProgress.syncTimestamp,
                        ledgerAccountId,
                    };
                }),
            );
    }

    getPNLPriceMovements(
        portfolioId: number,
        date: Date,
        paginationParams: IPaginationParams,
        sorting: string[],
        sortingBy: 'usd' | 'diffPercentage',
    ): Observable<ICombinedDeFiImpactData> {
        const params = convertParamsForRequests({
            portfolioId,
            date,
            paginationParams,
            sorting,
            getRecordCount: true,
            getRecords: true,
        });

        return this.api
            .get<IPNLPriceMovementResponse>(
                'DataQualityCheck/IdentifyPnlPriceMovements',
                params,
            )
            .pipe(
                map((response) => {
                    const data = response.records.map((PNLPriceMovement) => ({
                        ...PNLPriceMovement,
                        isExpanded: false,
                    }));

                    return {
                        portfolioId,
                        date,
                        paginationParams,
                        sorting,
                        data,
                        recordCount: response.recordCount,
                        sortingBy,
                    };
                }),
            );
    }
}
