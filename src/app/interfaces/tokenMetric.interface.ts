export interface ITokenMetric {
    name: string;
    change: number;
    tokenOpening?: number;
    tokenClosing?: number;
    tokenChange?: number;
    usdOpening: number;
    usdClosing: number;
    usdChange: number;
}
