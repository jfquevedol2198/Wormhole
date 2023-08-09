import { Injectable } from '@angular/core';

import { waitFor } from '../../utilities/sleep';

import { ETH_ADDRESS, WETH_ADDRESS } from '../../constants/ethereum';

import { isTheSameToken } from '../../utilities/erc20';

export const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple';

const REFRESH_CACHE = 3000;

@Injectable({
    providedIn: 'root',
})
export class GeckoPriceService {
    erc20Prices = new Map<string, { rate: number; refreshed: number }>();
    ethPrice = -1;
    ethRefreshed = 0;

    pricesRefreshing = false;

    async refreshERC20Prices(tokens: string[]): Promise<object> {
        tokens = tokens.map((t) => t.toLowerCase());

        if (tokens.length) {
            console.log('refreshing prices:', tokens);

            const tokenString = tokens.join(',');

            this.pricesRefreshing = true;

            await fetch(
                `${COINGECKO_API}/token_price/ethereum?contract_addresses=${tokenString}&vs_currencies=usd`,
            )
                .then((response) => response.json())
                .then((json) => {
                    tokens.forEach((addr) => {
                        if (
                            json[addr] !== undefined &&
                            json[addr].usd !== undefined
                        ) {
                            this.erc20Prices.set(addr, {
                                rate: json[addr].usd,
                                refreshed: new Date().getTime(),
                            });
                        } else {
                            this.erc20Prices.set(addr, {
                                rate: -9999,
                                refreshed: new Date().getTime(),
                            });
                        }
                    });
                })
                .catch((err) => {
                    console.log(`ERROR: fetching price for ${tokenString}`);
                    console.log(err);
                    return {};
                });

            this.pricesRefreshing = false;

            await waitFor(!this.pricesRefreshing);

            await this.getETHPrice(true);

            return this.erc20Prices;
        }
    }

    async refreshETHPrice(): Promise<number> {
        await fetch(`${COINGECKO_API}/price?ids=ethereum&vs_currencies=usd`)
            .then((response) => response.json())
            .then((json) => (this.ethPrice = json.ethereum.usd));

        this.ethRefreshed = new Date().getTime();

        return this.ethPrice;
    }

    async getERC20Price(
        tokenAddress: string,
        refresh: boolean = false,
    ): Promise<number> {
        tokenAddress = tokenAddress.toLowerCase();

        if (
            !this.erc20Prices.has(tokenAddress) ||
            (this.erc20Prices.get(tokenAddress)['refreshed'] <
                new Date().getTime() - REFRESH_CACHE &&
                refresh)
        ) {
            await waitFor(!this.pricesRefreshing);

            await this.refreshERC20Prices([tokenAddress]);
        }

        return this.getLatestPrice(tokenAddress);
    }

    async getETHPrice(refresh: boolean = false): Promise<number> {
        if (
            this.ethPrice === undefined ||
            (this.ethRefreshed < new Date().getTime() - REFRESH_CACHE &&
                refresh)
        ) {
            await waitFor(!this.pricesRefreshing);

            return this.refreshETHPrice();
        }

        return this.ethPrice;
    }

    async getPrice(
        tokenAddress: string,
        refresh: boolean = false,
    ): Promise<number> {
        console.log('getting price:', tokenAddress);

        return tokenAddress === ETH_ADDRESS || tokenAddress === WETH_ADDRESS
            ? await this.getETHPrice(refresh)
            : await this.getERC20Price(tokenAddress, refresh);
    }

    getLatestPrice(tokenAddress: string): number {
        return tokenAddress === ETH_ADDRESS || tokenAddress === WETH_ADDRESS
            ? this.ethPrice
            : this.erc20Prices.get(tokenAddress.toLowerCase())['rate'];
    }

    async getExchangeRate(fromToken: string, toToken: string): Promise<number> {
        return isTheSameToken(fromToken, toToken)
            ? 1
            : (await this.getPrice(fromToken, true)) /
                  (await this.getPrice(toToken, true));
    }
}
