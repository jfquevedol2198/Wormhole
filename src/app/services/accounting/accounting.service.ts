import makeBlockie from 'ethereum-blockies-base64';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    ILedgerAccount,
    ILedgerAccountsResponse,
} from '../../interfaces/account.interface';
import { IPresetDefinition } from '../../interfaces/advancedSearch.interface';
import {
    IAddOperationRequestData,
    IModifyOperationRequestData,
    IOperation,
    IOperationResponse,
    IRemoveOperationResponse,
} from '../../interfaces/operation.interface';
import { IOperationState } from '../../interfaces/operationState.interface';
import { IPaginationParams } from '../../interfaces/paginationParams.interface';
import {
    IPNLPositionData,
    IPNLPositionDetails,
    IPNLPositionDetailsResponse,
    IPNLPositionResponse,
} from '../../interfaces/pnlPosition.interface';
import {
    IAddPortfolioParams,
    IModifyPortfolioParams,
    IPortfolio,
    IPortfolioResponse,
    IRemovePortfolioResponse,
} from '../../interfaces/portfolio.interface';
import { IRange } from '../../interfaces/range.interface';
import {
    IWormholePostResponse,
    IWormholeMessageResponse,
} from '../../interfaces/response.interface';
import {
    ITraderStamina,
    ITraderStaminaResponse,
} from '../../interfaces/traderStamina.interface';
import {
    IBlockNumberRange,
    ICombinedTransactions,
    ITransactionsResponse,
} from '../../interfaces/transaction.interface';
import { ITransactionsRequestParams } from '../../interfaces/transactionsRequestParams.interface';
import { convertParamsForRequests } from '../../utilities/convertParams';
import { getOperationStatusWithIcon } from '../../utilities/getOperationStatusWithIcon';
import { getOperationTreatment } from '../../utilities/getOperationTreatment';
import { getTransactionTreatment } from '../../utilities/getTransactionTreatment';
import { hasPositionData } from '../../utilities/hasPositionData';
import { removeAddress } from '../../utilities/removeAddress';
import { ApiService } from '../api/api.service';

const MAX_RECORDS = 10000000;

@Injectable()
export class AccountingService {
    constructor(private readonly api: ApiService) {}

    getBlockNumber(date: Date): Observable<number> {
        const timestamp = moment(date).unix();
        const params = [{ name: 'timestamp', value: timestamp }];

        return this.api.get<any>('ReferenceData/GetBlockNumber', params).pipe(
            map((response) => response),
            catchError((error) => throwError(error)),
        );
    }

    getLedgerAccounts(
        portfolioId?: number,
        getRecordCount: boolean = false,
        getRecords: boolean = true,
        paginationParams?: IPaginationParams,
        sorting?: string,
    ): Observable<ILedgerAccount[]> {
        const params = convertParamsForRequests({
            getRecordCount,
            getRecords,
            portfolioId,
            paginationParams,
            sorting,
        });
        return this.api
            .get<ILedgerAccountsResponse>('Accounting/GetLedgerAccount', params)
            .pipe(
                map((response) => {
                    return response.records.map((account) => ({
                        ...account,
                        iconUrl: makeBlockie(account.ledgerAddress),
                    }));
            }));
    }

    getTransactions(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        isEditMode: boolean,
        blockNumberRange: IBlockNumberRange,
        sorting: string[],
        reportPresetId?: number,
        filters?: IPresetDefinition,
    ): Observable<ICombinedTransactions> {
        const params: ITransactionsRequestParams = {
            startBlock: blockNumberRange.left as number,
            endBlock: blockNumberRange.right as number,
            portfolioId,
            getRecordCount: true,
            getRecords: true,
            pageSize: paginationParams.pageSize,
            pageIndex: paginationParams.pageIndex + 1,
            sorting,
            reportPresetId: Number(reportPresetId),
            filters: !isEditMode
                ? {
                      ...filters,
                      isDisabled: false,
                  }
                : filters,
        };

        return this.api
            .post<ITransactionsResponse>('Accounting/GetTransactions', params)
            .pipe(
                map((response) => {
                    const transactions = response.records.map(
                        (transaction) => ({
                            ...transaction,
                            date: moment.utc(transaction.timestamp).local(),
                            treatmentWithIcons: getTransactionTreatment(
                                transaction.transactionTreatment,
                            ),
                            isExpanded: false,
                        }),
                    );

                    return {
                        portfolioId,
                        range,
                        paginationParams,
                        isEditMode,
                        blockNumberRange,
                        transactions,
                        recordCount: response.recordCount,
                        sorting,
                        reportPresetId,
                    };
                }),
            );
    }

    getOperations(transactionId: number): Observable<IOperation[]> {
        const params = convertParamsForRequests({
            transactionId,
            paginationParams: {
                pageIndex: 0,
                pageSize: 100,
            },
            getRecords: true,
        });

        return this.api
            .get<IOperationResponse>('Accounting/GetOperations', params)
            .pipe(
                map((response) =>
                    response.records.map((operation) => {
                        return {
                            ...operation,
                            isOperationSelected: false,
                            treatmentWithIcons:
                                getOperationTreatment(operation),
                            expandOverlay: false,
                            transactionId,
                            statusWithIcon:
                                getOperationStatusWithIcon(operation),
                        };
                    }),
                ),
            );
    }

    addOperation(
        operationData: IAddOperationRequestData,
    ): Observable<IWormholePostResponse> {
        return this.api.post<IWormholePostResponse>('Accounting/AddOperation', {
            operation: operationData,
        });
    }

    modifyOperation(
        operationData: IModifyOperationRequestData,
    ): Observable<IWormholeMessageResponse> {
        return this.api.put<IWormholeMessageResponse>(
            'Accounting/ModifyOperation',
            { operation: operationData },
        );
    }

    removeOperation(operationId: number): Observable<IRemoveOperationResponse> {
        return this.api.delete('Accounting/RemoveOperation', { operationId });
    }

    modifyOperationState(
        operationState: IOperationState,
    ): Observable<IWormholeMessageResponse> {
        return this.api.put('Accounting/ModifyStateOperation', operationState);
    }

    getOperationById(operationId: number): Observable<IOperation> {
        const params = convertParamsForRequests({
            paginationParams: {
                pageIndex: 0,
                pageSize: 100,
            },
            operationId,
        });

        return this.api
            .get<IOperationResponse>('Accounting/GetOperations', params)
            .pipe(
                map((response) => {
                    return {
                        ...response.records[0],
                        treatmentWithIcons: getOperationTreatment(
                            response.records[0],
                        ),
                    };
                }),
            );
    }

    getProfitAndLoss(
        portfolioId: number,
        fromDate?: Date,
        toDate?: Date,
    ): Observable<IPNLPositionData[]> {
        const params = convertParamsForRequests({
            portfolioId,
            fromDate,
            toDate,
            getRecords: true,
            paginationParams: {
                // we need a big number to get all of the records from GetProfitAndLossDetail
                pageSize: MAX_RECORDS,
                pageIndex: 0,
            },
        });

        return this.api
            .get<IPNLPositionResponse>('Accounting/GetProfitAndLoss', params)
            .pipe(
                map((response) =>
                    response.records.map((position) => ({
                        ...position,
                        date: moment(position.timestamp),
                    })),
                ),
            );
    }

    getProfitAndLossDetails(
        portfolioId: number,
        fromToDate: moment.Moment,
    ): Observable<IPNLPositionDetails[]> {
        const params = convertParamsForRequests({
            portfolioId,
            fromMomentDate: fromToDate,
            toMomentDate: fromToDate,
            paginationParams: {
                // we need a big number to get all of the records from GetProfitAndLossDetail
                pageSize: MAX_RECORDS,
                pageIndex: 0,
            },
        });

        return this.api
            .get<IPNLPositionDetailsResponse>(
                'Accounting/GetProfitAndLossDetail',
                params,
            )
            .pipe(
                map((response: IPNLPositionDetailsResponse) => {
                    return response.records
                        .map((position) => ({
                            ...position,
                            date: new Date(position.timestamp),
                            assetName: removeAddress(position.assetName),
                            assetSymbol: removeAddress(position.assetSymbol),
                        }))
                        .filter((position: IPNLPositionDetails) =>
                            hasPositionData(position),
                        );
                }),
            );
    }

    getPortfolios(
        getRecordCount: boolean = false,
        getRecords: boolean = true,
        portfolioId?: number,
        address?: string,
        paginationParams?: IPaginationParams,
        sorting?: string,
    ): Observable<IPortfolio[]> {
        const params = convertParamsForRequests({
            getRecordCount,
            getRecords,
            portfolioId,
            address,
            paginationParams,
            sorting,
        });

        return this.api
            .get<IPortfolioResponse>('Accounting/GetPortfolios', params)
            .pipe(
                map((response) => {
                    return response.records.map((portfolio) => {
                        const ledgers: string[] = [];
                        const accountsWithIcons: ILedgerAccount[] = [];

                        if (portfolio.ledgerAccounts) {
                            portfolio.ledgerAccounts.map((account) => {
                                accountsWithIcons.push({
                                    ...account,
                                    iconUrl: makeBlockie(account.ledgerAddress),
                                });

                                if (
                                    !ledgers.some(
                                        (ledger) =>
                                            ledger === account.ledgerName,
                                    )
                                ) {
                                    ledgers.push(account.ledgerName);
                                }
                            });
                        }

                        return {
                            ...portfolio,
                            isSelected: false,
                            ledgerAccounts: accountsWithIcons,
                            addressesCount: accountsWithIcons.length,
                            ledgersCount: ledgers.length,
                        };
                    });
                }),
            );
    }

    addPortfolio(
        params: IAddPortfolioParams,
    ): Observable<IWormholePostResponse> {
        return this.api.post('Accounting/AddPortfolio', params);
    }

    modifyPortfolio(
        params: IModifyPortfolioParams,
    ): Observable<IWormholeMessageResponse> {
        return this.api.put('Accounting/ModifyPortfolio', params);
    }

    removePortfolio(portfolioId: number): Observable<IRemovePortfolioResponse> {
        return this.api.delete('Accounting/RemovePortfolio', { portfolioId });
    }

    modifyAddressLabel(
        address: string,
        name: string,
    ): Observable<IWormholeMessageResponse> {
        return this.api.put('ReferenceData/ModifyAddressLabel', {
            name,
            address,
        });
    }

    getTraderStamina(portfolioId: number): Observable<ITraderStamina[]> {
        const params = convertParamsForRequests({
            portfolioId,
            paginationParams: {
                pageIndex: 0,
                pageSize: MAX_RECORDS,
            },
        });

        return this.api
            .get<ITraderStaminaResponse>('Accounting/GetTraderStamina', params)
            .pipe(map((response) => response.records));
    }
}
