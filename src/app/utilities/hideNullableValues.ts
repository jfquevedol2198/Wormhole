import { formatValue } from './format-value';
import { IAsset } from '../interfaces/asset.interface';

export const hideNullableValue = (asset: IAsset, property: string, native: boolean = false, usdProperty?: string): number | string => {
    return native
        ? asset.positions[0][usdProperty] !== 0 ? `${formatValue(asset.positions[0][property])} ${asset.positions[0].assetSymbol}` : '-'
        : asset.positions[0][property] !== 0 ? `${formatValue(asset.positions[0][property], '$')}` : '-';
};
