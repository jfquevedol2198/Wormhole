import { IPresetDefinition } from './advancedSearch.interface';
import { IPaginationParams } from './paginationParams.interface';

export interface ITransactionsRequestParams extends IPaginationParams {
    sorting: string[];
    getRecordCount: true;
    getRecords: true;
    reportPresetId?: number;
    filters?: IPresetDefinition;
    portfolioId: number;
    accountId?: number;
    startBlock: number;
    endBlock: number;
}

export interface ITransactionsRequestPresetParams extends IPaginationParams {
    reportPresetId: number;
    portfolioId: number;
    getRecordCount: true;
    getRecords: true;
}
