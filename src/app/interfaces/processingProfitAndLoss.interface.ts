import { IWormholeBaseResponse } from './response.interface';
import { IWorkerTaskFromResponse } from './workerTask.interface';

export type IProcessingProfitAndLossStatus =
    | 'running'
    | 'completed'
    | 'failed'
    | 'aborted'
    | 'terminated';

export interface IProcessingProfitAndLoss {
    profitAndLossDefinitionId: number;
    profitAndLossScheduleId: number;
    periodStartDate: string;
    periodEndDate: string;
    draft: boolean;
    published: boolean;
    progress: number;
    expectedEndDate: string;
    priority: number;
    integrity: boolean;
    reference: string;
    issues: string;
    createdDate: string;
    update: boolean;
    workerTaskId: number;
    status: string;
}

export interface IProcessingProfitAndLossResponse
    extends IWormholeBaseResponse {
    records: IProcessingProfitAndLoss[];
}

export interface IProcessingProfitAndLossData {
    data: IProcessingProfitAndLoss[];
    pageIndex: number;
    pageSize: number;
    total: number;
}

// GetMethodDefinition
export interface IPNLMethodDefinition {
    methodDefinitionId: number;
    platformName: string;
    methodId: string;
    signature: string;
    description: string;
    transactionType: string;
    treatment: string;
    contractGroup: string;
    status: string;
    firstSeenBlockNumber: 0;
    firstSeenTimestamp: string;
    transactionHash: string;
    transactionCount: number;
}
export interface IPNLMethodDefinitionResponse
    extends IWormholeBaseResponse {
    records: IPNLMethodDefinition[];
}

// GetTransactionReportMessages
export interface IPNLTransactionReportMessage {
    reportMessageId: number;
    workerTaskId: number;
    ledgerAccountId: number;
    transactionId: number;
    reportMessageType: string;
    severity: string;
    message: string;
    notes: string;
    dismissed: boolean;
    blockNumber: number;
}
export interface IPNLTransactionReportMessageResponse
    extends IWormholeBaseResponse {
    records: IPNLTransactionReportMessage[];
}

// GetMissingCurrencyPairs
export interface IPNLMissingCurrencyPairs {
    status: string;
    rateCount: number;
    exchangeRatePairId: number;
    pairName: string;
    baseTokenContractAddress: string;
    tokenContractAddress: string;
    firstSeenBlockNumber: number;
    firstSeenTimestamp: string;
    lastSeenBlockNumber: number;
    lastSeenTimestamp: string;
    tokenDependency: string;
    requested: boolean;
    active: boolean;
    syncedBlockNumber: number;
    syncedTimestamp: string;
    verifiedBlockNumber: number;
    verifiedTimestamp: string;
    curveTimestamp: string;
    rateSource: string;
}
export interface IPNLMissingCurrencyPairsResponse
    extends IWormholeBaseResponse {
    records: IPNLMissingCurrencyPairs[];
}

// GetAddressLabel
export interface IPNLAddressLabel {
    addressLabelId: string;
    platformName: string;
    name: string;
    addressType: string;
    assetName: string;
    assetSymbol: string;
    assetDecimals: string;
    assetUri: string;
    ledgerName: string;
    tokenId: string;
    score: string;
    scam: boolean;
    address: string;
    firstTransactionHash: string;
    firstSeenBlockNumber: string;
    firstSeenTimestamp: string;
    transactionCount: string;
}
export interface IPNLAddressLabelResponse
    extends IWormholeBaseResponse {
    records: IPNLAddressLabel[];
}

// GetProfitAndLossReportMessages
export interface IPNLReportMessages {
    reportMessageId: number;
    workerTaskId: number;
    workerTask: IWorkerTaskFromResponse;
    ledgerAccountId: number;
    ledgerAccount: any;
    profitAndLossScheduleId: number;
    profitAndLossDefinitionId: number;
    timestamp: string;
    reportMessageType: string;
    severity: string;
    message: string;
    notes: string;
    dismissed: boolean;
}
export interface IPNLReportMessagesResponse
    extends IWormholeBaseResponse {
    records: IPNLReportMessages[];
}