import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    IBlockchainMessagesResponse,
    ICombinedBlockchainMessagesData,
} from 'src/app/interfaces/blockchainMessages';

import { Injectable } from '@angular/core';

import { IReportPresetResponse } from '../../interfaces/advancedSearch.interface';
import { IPaginationParams } from '../../interfaces/paginationParams.interface';
import { IRange } from '../../interfaces/range.interface';
import { IBlockNumberRange } from '../../interfaces/transaction.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { ApiService } from '../api/api.service';

@Injectable()
export class SubLedgersService {
    constructor(private readonly api: ApiService) {}

    getBlockchainMessages(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        sorting: string[],
        blockNumberRange: IBlockNumberRange,
    ): Observable<ICombinedBlockchainMessagesData> {
        const params = convertParamsForRequests({
            getRecordCount: true,
            getRecords: true,
            paginationParams,
            sorting,
            blockNumberRange,
            portfolioId,
        });

        return this.api
            .get<IBlockchainMessagesResponse>(
                'Accounting/GetBlockchainMessages',
                params,
            )
            .pipe(
                map((response) => {
                    const blockchainMessages = response.records.map(
                        (blockchainMessage) => ({
                            ...blockchainMessage,
                            date: moment
                                .utc(blockchainMessage.timestamp)
                                .local(),
                        }),
                    );

                    return {
                        data: blockchainMessages,
                        total: response.recordCount,
                        range,
                        paginationParams,
                        sorting,
                        blockNumberRange,
                        portfolioId,
                    };
                }),
            );
    }

    getReportPresetIdByNameFromGlobalScope(name: string): Observable<number> {
        const params = convertParamsForRequests({
            name,
            scope: 'Global',
        });

        return this.api
            .get<IReportPresetResponse>('Accounting/GetReportPreset', params)
            .pipe(
                map((data) =>
                    data.records.length > 0
                        ? data.records[0].reportPresetId
                        : 0,
                ),
            );
    }
}
