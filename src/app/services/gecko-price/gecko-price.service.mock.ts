export class GeckoPriceServiceMock {
    async getExchangeRate(token1: string, token2: string): Promise<number> {
        return 1;
    }
}
