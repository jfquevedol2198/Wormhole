export interface IDataAdminCurrencyPairProcessingJobResponse {
    id: string | number,
    name: string,
    severity: string,
    message: string,
    startHeight: string,
    endHeight: string,
    note: string,
    dismiss: boolean,
    isSelect: boolean
}

export interface IDataAdminCurrencyPairProcessingJob extends IDataAdminCurrencyPairProcessingJobResponse {
    action: string
}

export interface IDataAdminCurrencyPairProcessingJobData {
    data: IDataAdminCurrencyPairProcessingJob[]
}
