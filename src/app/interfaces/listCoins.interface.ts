export interface IListCoinsResponse {
    id: string,
    name: string,
    image: string,
}

export interface IListCoins extends IListCoinsResponse {
    action: string
}

export interface IListCoinsData {
    data: IListCoins[]
}
