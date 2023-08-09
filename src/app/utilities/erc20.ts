import { ETH_ADDRESS, WETH_ADDRESS } from '../constants/ethereum';

export const isTheSameToken = (token1: string, token2: string): boolean =>
    token1 === token2 ||
    (token1 === ETH_ADDRESS && token2 === WETH_ADDRESS) ||
    (token1 === WETH_ADDRESS && token2 === ETH_ADDRESS);
