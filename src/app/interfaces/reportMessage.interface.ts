import { IWormholeBaseResponse } from './response.interface';

export interface IReportMessage {
    reportMessageType: string;
    severity: string;
    transactionHash: string;
    exchangeRatePairName: string;
    message: string;
}

export interface IReportMessageResponse extends IWormholeBaseResponse {
    reportMessages: IReportMessage[];
}
