export interface IDataAdminAddressLabelJobResponse {
    id: number;
    agent: string;
    runCount: number;
    sessionID: string;
    scheduled: string;
    started: string;
    completed: string;
    provider: string;
    status: string;
    active: boolean;
    isSelected: boolean;
}

export interface IDataAdminAddressLabelJob extends IDataAdminAddressLabelJobResponse {
    action: string
}

export interface IDataAdminAddressLabelJobData {
    data: IDataAdminAddressLabelJob[]
}
