import { IAsset } from './asset.interface';
import { IPercentageData } from './percentage.interface';
import { IPNLPositionDetails } from './pnlPosition.interface';
import { IWormholeBaseResponse } from './response.interface';
import { ISortColumn } from './sort-column.interface';

export interface IPlatform extends IPercentageData {
    name: string;
    positions?: IPNLPositionDetails[];
}

export interface IPlatformWithLogo {
    name: string;
    platformLogoUri?: string;
}

export interface IPlatformPerformance
    extends IPlatformWithLogo,
        IPercentageData {
    records: IAsset[];
    expanded?: boolean;
    highlightColumn?: string;
    sortColumns?: ISortColumn[];
}

export interface IPlatformRecords {
    ledgerName: string;
    platformId: number;
    name: string;
    platformIcon: string;
    score: number;
    scam: boolean;
}
export interface IPlatformsResponse extends IWormholeBaseResponse {
    records: IPlatformRecords[];
}
