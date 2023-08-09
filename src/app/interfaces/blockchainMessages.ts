import { Moment } from 'moment';

import { IPaginationParams } from './paginationParams.interface';
import { IRange } from './range.interface';
import { IWormholeBaseResponse } from './response.interface';
import { IBlockNumberRange } from './transaction.interface';

export interface IBlockchainMessageFromResponse {
    recipient: string;
    transactionHash: string;
    blockNumber: number;
    timestamp: string;
    message: string;
}

export interface IBlockchainMessage extends IBlockchainMessageFromResponse {
    date: Moment;
}

export interface IBlockchainMessagesResponse extends IWormholeBaseResponse {
    records: IBlockchainMessage[];
}

export interface IBlockchainMessagesData {
    data: IBlockchainMessage[];
    pageIndex: number;
    pageSize: number;
    total: number;
    sorting: string[];
}

export interface ICombinedBlockchainMessagesData {
    portfolioId: number;
    paginationParams: IPaginationParams;
    sorting: string[];
    range?: IRange;
    blockNumberRange?: IBlockNumberRange;
    data?: IBlockchainMessage[];
    total?: number;
}
