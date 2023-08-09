import { InjectionToken } from '@angular/core';

import { Network } from '@ethersproject/networks';

import { ethers, providers } from 'ethers';

export const MOCK_NETWORK: Network = {
    name: 'ethereum',
    chainId: 1,
};

export class MockProvider extends providers.BaseProvider {
    detectNetwork = async (): Promise<Network> => MOCK_NETWORK;

    getGasPrice = async (): Promise<ethers.BigNumber> =>
        ethers.utils.parseUnits('100', 1);

    getAddress = async (): Promise<string> => 'address';
}

export const WEB3_ETHERS_MOCK = new InjectionToken<providers.BaseProvider>(
    'Mock Ethers Provider',
    {
        providedIn: 'root',
        factory: () => new MockProvider(MOCK_NETWORK),
    },
);
