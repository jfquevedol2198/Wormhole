import {
    defiImpactColumnNameToDBColumnName,
    convertDBColumnNameAfterSortingByChanged,
    dbColumnNameToDeFiImpactColumnName,
} from './defiImpactColumnNameConversion';

describe('DeFiImpactColumnNameToDBColumnName', () => {
    it('should get DB column name', () => {
        expect(defiImpactColumnNameToDBColumnName('assetName', 'usd')).toEqual(
            'assetName',
        );

        expect(
            defiImpactColumnNameToDBColumnName('assetName', 'diffPercentage'),
        ).toEqual('assetName');

        expect(defiImpactColumnNameToDBColumnName('pnl', 'usd')).toEqual(
            'pnlClosing',
        );

        expect(
            defiImpactColumnNameToDBColumnName('pnl', 'diffPercentage'),
        ).toEqual('pnlDiffPercentage');

        expect(defiImpactColumnNameToDBColumnName('supply', 'usd')).toEqual(
            'supplyClosingUsd',
        );

        expect(
            defiImpactColumnNameToDBColumnName('supply', 'diffPercentage'),
        ).toEqual('supplyDiffPercentage');
    });
});

describe('DbColumnNameToDeFiImpactColumnName', () => {
    it('should get DeFi impact table column name', () => {
        expect(dbColumnNameToDeFiImpactColumnName('assetName', 'usd')).toEqual(
            'assetName',
        );

        expect(
            dbColumnNameToDeFiImpactColumnName('assetName', 'diffPercentage'),
        ).toEqual('assetName');

        expect(dbColumnNameToDeFiImpactColumnName('pnlClosing', 'usd')).toEqual(
            'pnl',
        );

        expect(
            dbColumnNameToDeFiImpactColumnName(
                'pnlDiffPercentage',
                'diffPercentage',
            ),
        ).toEqual('pnl');

        expect(
            dbColumnNameToDeFiImpactColumnName('supplyClosingUsd', 'usd'),
        ).toEqual('supply');

        expect(
            dbColumnNameToDeFiImpactColumnName(
                'supplyDiffPercentage',
                'diffPercentage',
            ),
        ).toEqual('supply');
    });
});

describe('ConvertDBColumnNameAfterSortingByChanged', () => {
    it('should get DeFi impact table column name', () => {
        expect(convertDBColumnNameAfterSortingByChanged('assetName')).toEqual(
            'assetName',
        );

        expect(convertDBColumnNameAfterSortingByChanged('pnlClosing')).toEqual(
            'pnlDiffPercentage',
        );

        expect(
            convertDBColumnNameAfterSortingByChanged('pnlDiffPercentage'),
        ).toEqual('pnlClosing');

        expect(
            convertDBColumnNameAfterSortingByChanged('supplyClosingUsd'),
        ).toEqual('supplyDiffPercentage');

        expect(
            convertDBColumnNameAfterSortingByChanged('supplyDiffPercentage'),
        ).toEqual('supplyClosingUsd');
    });
});
