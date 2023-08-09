import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlatformsResponse } from 'src/app/interfaces/platform.interface';
import { ITransactionSourceResponse } from 'src/app/interfaces/transactionSource.interface';
import { convertParamsForRequests } from 'src/app/utilities/convertParams';

import { Injectable } from '@angular/core';

import {
    IPreset,
    IPresetDefinition,
    IReportPresetResponse,
    IPersistence,
    IScope,
} from '../../interfaces/advancedSearch.interface';
import { IWormholePostResponse } from '../../interfaces/response.interface';
import { removeEmptyValues } from '../../utilities/removeEmptyValues';
import { ApiService } from '../api/api.service';
import {
    convertPresetPropertiesForUpdate,
    translateFormValuesAndTypes,
} from './helperFunctions';

@Injectable()
export class AdvancedSearchService {
    scope: IScope = 'User';

    constructor(private readonly api: ApiService) {}

    getTransactionSource() {
        return this.api
            .get<ITransactionSourceResponse>(
                'ReferenceData/GetTransactionSource',
            )
            .pipe(map((response) => response.records));
    }

    getPlatforms() {
        return this.api
            .get<IPlatformsResponse>('ReferenceData/GetPlatforms')
            .pipe(map((response) => response.records));
    }
    getReportPresets(
        persistence: IPersistence = 'Persistent',
    ): Observable<IPreset[]> {
        const params = convertParamsForRequests({
            persistence,
            scope: this.scope,
            name: '',
        });

        return this.api
            .get<IReportPresetResponse>('Accounting/GetReportPreset', params)
            .pipe(map((response) => response.records));
    }

    addReportPreset(
        obj: IPresetDefinition,
        persistence: IPersistence,
    ): Observable<IWormholePostResponse> {
        const presetWithNoName = { ...obj };
        delete presetWithNoName.presetName;
        const params = {
            name: obj.presetName,
            definition: presetWithNoName,
            persistence,
            scope: this.scope,
        };

        return this.api.post('Accounting/AddReportPreset', params);
    }

    modifyReportPreset(presetToModify: IPreset) {
        return this.api.put('Accounting/ModifyReportPreset', presetToModify);
    }

    removeReportPreset(presetId: number) {
        const parameters = {
            reportPresetId: presetId,
        };
        return this.api.delete('Accounting/RemoveReportPreset', parameters);
    }
    getPresetToUpdate(presetToUpdate): IPreset {
        const presetWithConvertedProperties = convertPresetPropertiesForUpdate(
            presetToUpdate.definition,
            presetToUpdate.name,
        );

        return {
            ...presetToUpdate,
            definition: {
                ...presetWithConvertedProperties,
            },
        };
    }

    getProperPresetFormatWithoutEmptyValues(
        obj: Observable<IPresetDefinition>,
    ): Observable<IPresetDefinition> {
        const filtersWithNonEmptyValues = removeEmptyValues(obj);
        const translatedForm = translateFormValuesAndTypes(
            filtersWithNonEmptyValues,
        );
        return of(translatedForm);
    }
}
