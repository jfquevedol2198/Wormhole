import {
    IPlatformPerformance,
    IPlatformWithLogo,
} from '../interfaces/platform.interface';
import { IPNLPositionDetails } from '../interfaces/pnlPosition.interface';

export const getPlatformPerformances = (
    pnlPositionsDetails: IPNLPositionDetails[],
): IPlatformPerformance[] => {
    const platformsWithLogos: IPlatformWithLogo[] = [];

    for (const platform of pnlPositionsDetails.map((positionDetails) => {
        return {
            name: positionDetails.platformName,
            platformLogoUri: positionDetails.platformLogoUri,
        };
    })) {
        if (
            !!platform.name &&
            !platformsWithLogos.some(({ name }) => name === platform.name)
        ) {
            platformsWithLogos.push(platform);
        } else if (
            !platform.name &&
            !platformsWithLogos.some(({ name }) => name === 'Wallet')
        ) {
            platformsWithLogos.push({
                name: 'Wallet',
            });
        }
    }

    return platformsWithLogos.map((platformWithLogo) => {
        const assetNames = [];

        for (const assetName of pnlPositionsDetails
            .filter(
                (assetPosition) =>
                    assetPosition.platformName === platformWithLogo.name ||
                    (platformWithLogo.name === 'Wallet' &&
                        !assetPosition.platformName),
            )
            .map((assetPosition) => assetPosition.assetName)) {
            if (!assetNames.includes(assetName)) {
                assetNames.push(assetName);
            }
        }

        const assets = assetNames.map((asset) => ({
            name: asset,
            positions: pnlPositionsDetails.filter(
                (pnlPositionDetails) =>
                    (pnlPositionDetails.platformName ===
                        platformWithLogo.name ||
                        (platformWithLogo.name === 'Wallet' &&
                            !pnlPositionDetails.platformName)) &&
                    pnlPositionDetails.assetName === asset,
            ),
        }));

        return {
            ...platformWithLogo,
            records: assets,
            sortColumns: [{ columnDef: 'name', direction: 'asc' }],
        };
    });
};
