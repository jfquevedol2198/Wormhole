export interface IBaseResponse {
    responseTimestamp: string;
    recordCount: number | null;
}

export interface ITokenDependency {
    baseTokenContractAddress: string;
    quoteTokenContractAddress: string;
}