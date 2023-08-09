export interface IDataAdminMethodDefinitions {
    status: string,
    platformName: string,
    contractGroup: string,
    methodID: string,
    signature: string,
    description: string,
    type: string,
    firstSeen: string,
    count: number,
    events: boolean,
    deposit: boolean,
    withdrawal: boolean,
    borrow: boolean,
    repay: boolean,
    claim: boolean,
    swap: boolean,
    treatment: string
}
export interface IDataAdminMethodDefinitionsResponse {
    responseTimestamp: string;
    recordCount: number;
    methodDefinitions: IDataAdminMethodDefinitions[]
}

export interface IDataAdminMethodDefinition extends IDataAdminMethodDefinitionsResponse {
    action: string
}

export interface IDataAdminMethodDefinitionData {
    data: IDataAdminMethodDefinition[]
}

export interface ICreateAdminMethodDefinitionData {
    platformId?: number;
    methodId: string;
    signature: string;
    description: string;
    transactionType: string;
    treatment: string;
}

export interface ICreateAdminMethodDefinitionResponse {
    id: number;
    message: string;
}