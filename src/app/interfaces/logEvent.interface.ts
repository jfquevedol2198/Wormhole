import { IKeyValuePair } from './keyvaluepair.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface ILogEvent {
    timestamp: string;
    messageTemplate: string;
    logLevel: string;
    eventId: string;
    eventName: string;
    exception: string;
    stats: string[];
    occurances: number;
    properties: IKeyValuePair;
}

export interface ILogEventResponse extends IWormholeBaseResponse {
    logEvents: ILogEvent[];
}
