export interface IPercentage {
    name: string;
    columnName: string;
    value: number;
    percentage: number;
    absolutePercentage?: number;
}

export interface IPercentageData {
    totalBalance?: number;
    absoluteTotalBalance?: number;
    percentages?: IPercentage[];
    sumOfAbsolutAssetBalances?: number;
}
