import { IAsset } from '../interfaces/asset.interface';
import { IPlatform } from '../interfaces/platform.interface';

export const getTotalInventoryBalance = (inventory: IAsset | IPlatform) => {
    let wallet = 0;
    let supply = 0;
    let stake = 0;
    let collateral = 0;
    let borrow = 0;
    inventory.positions.forEach((position) => {
        wallet += position.walletUsd;
        supply += position.supplyUsd;
        stake += position.stakeUsd;
        collateral += position.collateralUsd;
        borrow += position.borrowUsd;
    });
    const totalBalance = supply - borrow + wallet - collateral + stake;
    return {
        totalBalance,
        absoluteTotalBalance: Math.abs(totalBalance),
    };
};
