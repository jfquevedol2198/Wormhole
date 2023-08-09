import { IPNLPriceMovement } from '../interfaces/pnlPriceMovement.interface';
import { ITokenMetric } from '../interfaces/tokenMetric.interface';

export const getTokenMetrics = (
    pnlPriceMovement: IPNLPriceMovement,
): ITokenMetric[] => {
    return [
        {
            name: 'Profit and Loss',
            change: pnlPriceMovement.pnLDiffPercentage,
            usdOpening: pnlPriceMovement.pnLOpening,
            usdClosing: pnlPriceMovement.pnLClosing,
            usdChange:
                pnlPriceMovement.pnLClosing - pnlPriceMovement.pnLOpening,
        },
        {
            name: 'Exchange Rate',
            change: pnlPriceMovement.exchangeRateDiffPercentage,
            usdOpening: pnlPriceMovement.exchangeRateOpening,
            usdClosing: pnlPriceMovement.exchangeRateClosing,
            usdChange:
                pnlPriceMovement.exchangeRateClosing -
                pnlPriceMovement.exchangeRateOpening,
        },
        {
            name: 'New Worth',
            change: pnlPriceMovement.netWorthDiffPercentage,
            usdOpening: pnlPriceMovement.netWorthOpening,
            usdClosing: pnlPriceMovement.netWorthClosing,
            usdChange:
                pnlPriceMovement.netWorthClosing -
                pnlPriceMovement.netWorthOpening,
        },
        {
            name: 'Funding',
            change: pnlPriceMovement.fundingDiffPercentage,
            tokenOpening: pnlPriceMovement.fundingOpeningToken,
            tokenClosing: pnlPriceMovement.fundingClosingToken,
            tokenChange:
                pnlPriceMovement.fundingClosingToken -
                pnlPriceMovement.fundingOpeningToken,
            usdOpening: pnlPriceMovement.fundingOpeningUsd,
            usdClosing: pnlPriceMovement.fundingClosingUsd,
            usdChange:
                pnlPriceMovement.fundingClosingUsd -
                pnlPriceMovement.fundingOpeningUsd,
        },
        {
            name: 'Wallet',
            change: pnlPriceMovement.walletDiffPercentage,
            tokenOpening: pnlPriceMovement.walletOpeningToken,
            tokenClosing: pnlPriceMovement.walletClosingToken,
            tokenChange:
                pnlPriceMovement.walletClosingToken -
                pnlPriceMovement.walletOpeningToken,
            usdOpening: pnlPriceMovement.walletOpeningUsd,
            usdClosing: pnlPriceMovement.walletClosingUsd,
            usdChange:
                pnlPriceMovement.walletClosingUsd -
                pnlPriceMovement.walletOpeningUsd,
        },
        {
            name: 'Supply',
            change: pnlPriceMovement.supplyDiffPercentage,
            tokenOpening: pnlPriceMovement.supplyOpeningToken,
            tokenClosing: pnlPriceMovement.supplyClosingToken,
            tokenChange:
                pnlPriceMovement.supplyClosingToken -
                pnlPriceMovement.supplyOpeningToken,
            usdOpening: pnlPriceMovement.supplyOpeningUsd,
            usdClosing: pnlPriceMovement.supplyClosingUsd,
            usdChange:
                pnlPriceMovement.supplyClosingUsd -
                pnlPriceMovement.supplyOpeningUsd,
        },
        {
            name: 'Collateral',
            change: pnlPriceMovement.collateralDiffPercentage,
            tokenOpening: pnlPriceMovement.collateralOpeningToken,
            tokenClosing: pnlPriceMovement.collateralClosingToken,
            tokenChange:
                pnlPriceMovement.collateralClosingToken -
                pnlPriceMovement.collateralOpeningToken,
            usdOpening: pnlPriceMovement.collateralOpeningUsd,
            usdClosing: pnlPriceMovement.collateralClosingUsd,
            usdChange:
                pnlPriceMovement.collateralClosingUsd -
                pnlPriceMovement.collateralOpeningUsd,
        },
        {
            name: 'Stake',
            change: pnlPriceMovement.stakeDiffPercentage,
            tokenOpening: pnlPriceMovement.stakeOpeningToken,
            tokenClosing: pnlPriceMovement.stakeClosingToken,
            tokenChange:
                pnlPriceMovement.stakeClosingToken -
                pnlPriceMovement.stakeOpeningToken,
            usdOpening: pnlPriceMovement.stakeOpeningUsd,
            usdClosing: pnlPriceMovement.stakeClosingUsd,
            usdChange:
                pnlPriceMovement.stakeClosingUsd -
                pnlPriceMovement.stakeOpeningUsd,
        },
        {
            name: 'Borrow',
            change: pnlPriceMovement.borrowDiffPercentage,
            tokenOpening: pnlPriceMovement.borrowOpeningToken,
            tokenClosing: pnlPriceMovement.borrowClosingToken,
            tokenChange:
                pnlPriceMovement.borrowClosingToken -
                pnlPriceMovement.borrowOpeningToken,
            usdOpening: pnlPriceMovement.borrowOpeningUsd,
            usdClosing: pnlPriceMovement.borrowClosingUsd,
            usdChange:
                pnlPriceMovement.borrowClosingUsd -
                pnlPriceMovement.borrowOpeningUsd,
        },
    ];
};
