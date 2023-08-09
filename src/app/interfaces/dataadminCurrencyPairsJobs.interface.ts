export interface IDataAdminCurrencyPairJobResponse {
    id: string | number,
    column1: string | number,
    column2: string | number,
    agent: string,
    runCount: number
    sessionID: string
    scheduled: string | Date,
    started: string | Date,
    completed: string | Date
    provider: string,
    status: string
    active: boolean,
    isSelected: boolean
}

export interface IDataAdminCurrencyPairJob extends IDataAdminCurrencyPairJobResponse {
    action: string
}

export interface IDataAdminCurrencyPairJobData {
    data: IDataAdminCurrencyPairJob[]
}
