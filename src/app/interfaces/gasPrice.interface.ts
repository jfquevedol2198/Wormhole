export interface IGasPrice {
    slow: number;
    average: number;
    fast: number;
    fastest: number;
}

export interface IGasPriceWeekData extends IGasPrice {
    data: Array<IGasPriceWeekDataItem>;
}

export interface IGasPriceWeekDataItem {
    timestamp: number;
    value: number;
}
