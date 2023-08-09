import { WEB3 } from './web3';

describe('Web3 InjectionToken', () => {
    it('should create injection token', () => {
        const token = WEB3;

        expect(token).toBeTruthy();
        expect(token.ɵprov).toBeTruthy();
    });
});
