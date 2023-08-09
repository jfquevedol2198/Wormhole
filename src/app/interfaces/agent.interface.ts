import { IWormholeBaseResponse } from './response.interface';

export interface IAgent extends IAgentFromResponse {
    lastSeenDate: string;
}

export interface IAgentFromResponse {
    agentId: number;
    name: string;
    guid: string;
    enabled: boolean;
    lastSeen: string;
}

export interface IAgentsResponse extends IWormholeBaseResponse {
    agents: IAgent[];
}
