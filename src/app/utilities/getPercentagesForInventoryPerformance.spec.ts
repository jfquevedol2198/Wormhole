import { IAssetPerformance } from '../interfaces/asset.interface';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { getPercentagesForInventoryPerformance } from './getPercentagesForInventoryPerformance';

describe('Get Percentages For Inventory Performance', () => {
    const assetPerformances: IAssetPerformance[] = require('../../mocks/assetPerformances.json');
    const platformPerformance: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');

    it('should get percentages for platform performance', () => {
        expect(
            getPercentagesForInventoryPerformance(platformPerformance[0]),
        ).toEqual({
            percentages: [
                {
                    name: 'Borrow Balance',
                    columnName: 'borrow',
                    value: 3,
                    percentage: 37.5,
                },
                {
                    name: 'Funding Received',
                    columnName: 'floatingFunding',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'In Wallet',
                    columnName: 'wallet',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Supply Balance',
                    columnName: 'supply',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Stake Balance',
                    columnName: 'stake',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Collateral Balance',
                    columnName: 'collateral',
                    value: 1,
                    percentage: 12.5,
                },
            ],
            totalBalance: -1,
        });
    });

    it('should get percentages for asset performance', () => {
        expect(
            getPercentagesForInventoryPerformance(assetPerformances[0]),
        ).toEqual({
            percentages: [
                {
                    name: 'Borrow Balance',
                    columnName: 'borrow',
                    value: 3,
                    percentage: 37.5,
                },
                {
                    name: 'Funding Received',
                    columnName: 'floatingFunding',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'In Wallet',
                    columnName: 'wallet',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Supply Balance',
                    columnName: 'supply',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Stake Balance',
                    columnName: 'stake',
                    value: 1,
                    percentage: 12.5,
                },
                {
                    name: 'Collateral Balance',
                    columnName: 'collateral',
                    value: 1,
                    percentage: 12.5,
                },
            ],
            totalBalance: -1,
        });
    });
});
