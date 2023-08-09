import { IWormholeBaseResponse } from './response.interface';

export interface IPNLPriceMovementFromResponse {
    assetAddress: string;
    assetName: string;
    exchangeRatePairId: number;
    pnLOpening: number | null;
    pnLClosing: number | null;
    pnLDiffPercentage: number | null;
    exchangeRateOpening: number | null;
    exchangeRateClosing: number | null;
    exchangeRateDiffPercentage: number | null;
    netWorthOpening: number | null;
    netWorthClosing: number | null;
    netWorthDiffPercentage: number | null;
    fundingOpeningToken: number | null;
    fundingClosingToken: number | null;
    fundingOpeningUsd: number | null;
    fundingClosingUsd: number | null;
    fundingDiffPercentage: number | null;
    walletOpeningToken: number | null;
    walletClosingToken: number | null;
    walletOpeningUsd: number | null;
    walletClosingUsd: number | null;
    walletDiffPercentage: number | null;
    supplyOpeningToken: number | null;
    supplyClosingToken: number | null;
    supplyOpeningUsd: number | null;
    supplyClosingUsd: number | null;
    supplyDiffPercentage: number | null;
    collateralOpeningToken: number | null;
    collateralClosingToken: number | null;
    collateralOpeningUsd: number | null;
    collateralClosingUsd: number | null;
    collateralDiffPercentage: number | null;
    stakeOpeningToken: number | null;
    stakeClosingToken: number | null;
    stakeOpeningUsd: number | null;
    stakeClosingUsd: number | null;
    stakeDiffPercentage: number | null;
    borrowOpeningToken: number | null;
    borrowClosingToken: number | null;
    borrowOpeningUsd: number | null;
    borrowClosingUsd: number | null;
    borrowDiffPercentage: number | null;
}

export interface IPNLPriceMovement extends IPNLPriceMovementFromResponse {
    isExpanded: boolean;
}

export interface IPNLPriceMovementResponse extends IWormholeBaseResponse {
    records: IPNLPriceMovementFromResponse[];
}
