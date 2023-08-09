export interface IDataAdminProviderResponse {
    provider: number,
    pairCount: number,
    parameters: string | object
}

export interface IDataAdminProvider extends IDataAdminProviderResponse {
    action: string
}

export interface IDataAdminProviderData {
    data: IDataAdminProvider[]
}
