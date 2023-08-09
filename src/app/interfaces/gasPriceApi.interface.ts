export interface IGasPriceApi {
    current: {
        safeLow: number;
        average: number;
        fast: number;
        fastest: number;
    };
    thisWeek: {
        average: Array<IGasPriceApiWeekData>;
    };
}

export interface IGasPriceApiWeekData {
    0: number;
    1: number;
}
