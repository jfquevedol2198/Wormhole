import { InjectionToken } from '@angular/core';
import { providers, Signer } from 'ethers';

export const GAS_LIMIT = undefined;

const getEthereumProvider = () => {
    try {
        if ('ethereum' in window) {
            return new providers.Web3Provider((window as any).ethereum);
        } else {
            throw 'Please use a browser with MetaMask installed.';
        }
    } catch (e) {
        console.warn(e);

        return e;
    }
};

export const WEB3_ETHERS = new InjectionToken<providers.BaseProvider>(
    'Web3 Ethers Provider',
    {
        providedIn: 'root',
        factory: () => {
            try {
                return getEthereumProvider();
            } catch {
                return;
            }
        },
    },
);

export const SIGNER_ETHERS = new InjectionToken<Signer>(
    'Web3 Ethers Provider Signer',
    {
        providedIn: 'root',
        factory: () => {
            try {
                return getEthereumProvider()?.getSigner();
            } catch {
                return;
            }
        },
    },
);
