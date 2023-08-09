import { IPNLPositionDetails } from '../interfaces/pnlPosition.interface';

export const hasPositionData = (position: IPNLPositionDetails): boolean => {
    return !(
        position.floatingFundingUsd === 0 &&
        position.walletUsd === 0 &&
        position.supplyUsd === 0 &&
        position.stakeUsd === 0 &&
        position.collateralUsd === 0 &&
        position.borrowUsd === 0
    );
};
