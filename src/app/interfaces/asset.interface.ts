import { IPercentageData } from './percentage.interface';
import { IPlatform } from './platform.interface';
import { IPNLPositionDetails } from './pnlPosition.interface';
import { ISortColumn } from './sort-column.interface';

export interface IAsset extends IPercentageData {
    name: string;
    positions?: IPNLPositionDetails[];
}

export interface IAssetWithLogo {
    name: string;
    assetLogoUri?: string;
}

export interface IAssetPerformance extends IAssetWithLogo, IPercentageData {
    records: IPlatform[];
    expanded?: boolean;
    highlightColumn?: string;
    sortColumns?: ISortColumn[];
}
