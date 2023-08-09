import { IPNLPriceMovement } from '../../../../../interfaces/pnlPriceMovement.interface';
import {
    getDeFiImpactCellData,
    getDeFiImpactSubCellData,
} from '../../../../../utilities/getDeFiImpactCellData';

export const deFiImpactColumns = [
    {
        columnDef: ' ',
        header: ' ',
        columnType: 'is-selected-icon',
        isSortable: false,
    },
    {
        columnDef: 'assetName',
        header: 'Asset',
        columnType: '',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            `${pnlPriceMovement.assetName}`,
    },
    {
        columnDef: 'pnl',
        header: 'PnL',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.pnLClosing),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.pnLDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.pnLDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'exchangeRate',
        header: 'Exchange Rate',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.exchangeRateClosing),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(
                pnlPriceMovement.exchangeRateDiffPercentage,
            ),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.exchangeRateDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'netWorth',
        header: 'Net Worth',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.netWorthClosing),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.netWorthDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.netWorthDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'funding',
        header: 'Funding',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.fundingClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.fundingDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.fundingDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'wallet',
        header: 'Wallet',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.walletClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.walletDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.walletDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'supply',
        header: 'Supply',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.supplyClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.supplyDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.supplyDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'collateral',
        header: 'Collateral',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.collateralClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.collateralDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.collateralDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'stake',
        header: 'Stake',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.stakeClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.stakeDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.stakeDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
    {
        columnDef: 'borrow',
        header: 'Borrow',
        columnType: 'valueWithPercentageChange',
        isSortable: true,
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactCellData(pnlPriceMovement.borrowClosingUsd),
        subCell: (pnlPriceMovement: IPNLPriceMovement) =>
            getDeFiImpactSubCellData(pnlPriceMovement.borrowDiffPercentage),
        textColor: (pnlPriceMovement: IPNLPriceMovement) =>
            pnlPriceMovement.borrowDiffPercentage >= 0
                ? 'app-success'
                : 'app-error',
    },
];

export const innerDeFiImpactColumns = [
    {
        columnDef: 'tokenMetrics',
        columnType: 'tokenMetrics',
        cell: (pnlPriceMovement: IPNLPriceMovement) =>
            `${pnlPriceMovement.assetName}`,
    },
];
