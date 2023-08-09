import { FormGroup } from '@angular/forms';

import { IPreset } from './advancedSearch.interface';
import { IWormholeBaseResponse } from './response.interface';

export interface IReportSuccessResponse {
    message: string;
}
export interface IReportForm {
    reportPresetId: number;
    name: string;
    description: string;
}
export interface IReportDefinitionsRecords {
    reportDefinitionId: number;
    reportPresetId: number;
    reportPreset: IPreset;
    searchQuery: string;
    name: string;
    description: string;
    schedule: string;
    reportDefinitionItems: IReport[];
}

export interface IReport {
    reportId: number;
    reportDefinitionId: number;
    reportDefinition: IReportDefinitionsRecords;
    reportDate: string;
    createdDate: string;
    searchPreset: IPreset;
    location: string;
    uri: string;
}
export interface IReportDefinitionExtended extends IReportDefinitionsRecords {
    formGroup: FormGroup;
    isEdited: boolean;
    isExpanded: boolean;
}

export interface IReportDefinitionResponse extends IWormholeBaseResponse {
    records: IReportDefinitionsRecords[];
}
