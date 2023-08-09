import { Moment } from 'moment';

import { IWormholeBaseResponse } from './response.interface';

export interface IPNLPosition {
    ledgerAddress: string;
    timestamp: string;
    supplyBalance: number;
    stakeBalance: number;
    borrowBalance: number;
    collateralBalance: number;
    netWorth: number;
    dollarBasedPnL: number;
    fundingReceivedFixed: number;
    fundingReceivedFloating: number;
    profitAndLossScheduleId: number;
    walletBalance: number;
    tokenBasedPnL: number;
}

export interface IPNLPositionData extends IPNLPosition {
    date: Moment;
}

export interface IPNLPositionDetailsFromResponse {
    ledgerAddress: string;
    timestamp: string;
    platformName: string;
    platformLogoUri: string;
    assetName: string | null;
    assetSymbol: string | null;
    assetAddress: string;
    tokenId: string;
    assetLogoUri: string | null;
    fixedFundingUsd: number;
    floatingFundingUsd: number;
    fundingToken: number;
    netWorth: number;
    dollarBasedPnL: number;
    tokenBasedPnL: number;
    walletToken: number;
    walletUsd: number;
    supplyToken: number;
    supplyUsd: number;
    stakeToken: number;
    stakeUsd: number;
    collateralToken: number;
    collateralUsd: number;
    borrowToken: number;
    borrowUsd: number;
    portfolioId: number;
}

export interface IPNLPositionDetails extends IPNLPositionDetailsFromResponse {
    date: Date;
}

export interface IPNLPositionResponse extends IWormholeBaseResponse {
    records: IPNLPosition[];
}

export interface IPNLPositionDetailsResponse extends IWormholeBaseResponse {
    records: IPNLPositionDetailsFromResponse[];
}
