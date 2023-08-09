export interface IDependency {
    id: number,
    name: string,
    dataQuality: string,
    dataProvider: string,
    baseToken: string,
    quoteToken: string,
    provider: string,
    type: string,
    from: number[],
}

export interface ILine {
    path: string;
    color: string;
    fill?: string;
}
