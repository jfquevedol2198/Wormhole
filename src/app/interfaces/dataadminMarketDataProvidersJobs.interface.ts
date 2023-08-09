export interface IDataAdminProviderJobResponse {
    id: number,
    agent: string,
    runCount: number,
    scheduled: string | Date,
    started: string | Date,
    completed: string | Date,
    provider: string,
    active: boolean,
    isSelected: boolean
}

export interface IDataAdminProviderJob extends IDataAdminProviderJobResponse {
    action: string
}

export interface IDataAdminProviderJobData {
    data: IDataAdminProviderJob[]
}
