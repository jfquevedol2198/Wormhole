import {
    IAssetPerformance,
    IAssetWithLogo,
} from '../interfaces/asset.interface';
import { IPNLPositionDetails } from '../interfaces/pnlPosition.interface';

export const getAssetPerformances = (
    pnlPositionsDetails: IPNLPositionDetails[],
): IAssetPerformance[] => {
    const assetsWithLogos: IAssetWithLogo[] = [];

    for (const asset of pnlPositionsDetails.map((positionDetails) => {
        return {
            name: positionDetails.assetName,
            assetLogoUri: positionDetails.assetLogoUri,
        };
    })) {
        if (
            !!asset &&
            !assetsWithLogos.some(({ name }) => name === asset.name)
        ) {
            assetsWithLogos.push(asset);
        }
    }

    return assetsWithLogos.map((assetWithLogo) => {
        const platformNames = [];

        for (let platformName of pnlPositionsDetails
            .filter((position) => position.assetName === assetWithLogo.name)
            .map((position) => position.platformName)) {
            if (!platformName) {
                platformName = 'Wallet';
            }
            if (!platformNames.includes(platformName)) {
                platformNames.push(platformName);
            }
        }

        const platforms = platformNames.map((platform) => ({
            name: platform,
            positions: pnlPositionsDetails.filter(
                (pnlPositionDetails) =>
                    pnlPositionDetails.assetName === assetWithLogo.name &&
                    (pnlPositionDetails.platformName === platform ||
                        (!pnlPositionDetails.platformName &&
                            platform === 'Wallet')),
            ),
        }));

        return {
            ...assetWithLogo,
            records: platforms,
            sortColumns: [{ columnDef: 'name', direction: 'asc' }],
        };
    });
};
