export interface IWormholePostResponse {
    message: string;
    id: number;
}

export interface IWormholeMessageResponse {
    message: string;
}

export interface IWormholeBaseResponse {
    recordCount: number;
    responseTimestamp: string;
}
