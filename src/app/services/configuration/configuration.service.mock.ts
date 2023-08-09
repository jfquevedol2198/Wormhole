import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const FOLDING_ACCOUNT_FACTORY_MOCK_ADDRESS =
    '0x6C9c903c9e5CD19E1A1cC3BDA0160aa78C36eC72';

export class ConfigurationServiceMock {
    config = {
        wormholeUrl: 'someUrl',
        exchangeProvider: 'someProvider',
        exchangeSlippage: '1',
        exchangeMainRouteParts: '2',
        exchangeComplexityLevel: '3',
        foldingAccountFactory: FOLDING_ACCOUNT_FACTORY_MOCK_ADDRESS,
    };

    config$ = of(this.config);

    load = async () => new Promise((resolve) => resolve({}));
    reload = () => {};

    getWormholeUrl = (): Observable<string> =>
        this.config$.pipe(map((config) => config.wormholeUrl));

    getConfig = (key: string): Observable<string> =>
        this.config$.pipe(map((config) => config[key]));
}
