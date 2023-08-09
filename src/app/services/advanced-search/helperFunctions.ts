import { Observable, of } from 'rxjs';
import {
    IMethodProcessingEnum,
    IPreset,
    IPresetDefinition,
    IPresetForm,
} from 'src/app/interfaces/advancedSearch.interface';
import { removeEmptyValues } from 'src/app/utilities/removeEmptyValues';

export const getNumberTypes = (form, fieldsToBeChanged: string[]) => {
    const formWithNumberTypes = {
        ...form,
    };

    for (const x in formWithNumberTypes) {
        if (fieldsToBeChanged.includes(x)) {
            formWithNumberTypes[x] = Number(formWithNumberTypes[x]);
        }
    }
    return formWithNumberTypes;
};

export const translateFormValuesAndTypes = (
    obj: IPresetForm,
): IPresetDefinition => {
    const fieldsThatShouldBeNumber = [
        'fromValue',
        'toValue',
        'blockStartHeight',
        'blockEndHeight',
        'methodProcessing',
    ];
    const translatedForm = { ...obj };
    if (obj.currency === 'usd') {
        translatedForm['isUsdValue'] = true;
        delete translatedForm.currency;
    }
    if (obj.currency === 'eth') {
        translatedForm['isUsdValue'] = false;
        delete translatedForm.currency;
    }
    if (obj.blockEndHeight) {
        translatedForm.blockEndHeight = obj.blockEndHeight;
        delete translatedForm.startBy;
    }
    if (obj.blockStartHeight) {
        translatedForm.blockStartHeight = obj.blockStartHeight;
        delete translatedForm.endBy;
    }

    if (obj.methodProcessing) {
        translatedForm['methodProcessing'] = obj.methodProcessing.reduce(
            (a, b) => Number(a) + Number(b),
            0,
        );
    }

    const formWithPropertTypes = getNumberTypes(
        translatedForm,
        fieldsThatShouldBeNumber,
    );

    return formWithPropertTypes;
};
export const convertMethodProcessingStringToEnum = (
    methodsSum: number,
): string[] => {
    const getSubsetsOptions = () => {
        const optionsArray = [];
        for (const property in IMethodProcessingEnum) {
            if (!isNaN(Number(property)) && Number(property) !== 0) {
                optionsArray.push(Number(property));
            }
        }
        return optionsArray;
    };
    const getSubsets = (array, sum) => {
        if (sum == 0) {
            return ['0'];
        }
        function fork(i = 0, s = 0, t = []) {
            if (s === sum) {
                result.push(t);
                return;
            }
            if (i === array.length) {
                return;
            }
            if (s + array[i] <= sum) {
                fork(i + 1, s + array[i], t.concat(array[i]));
            }
            fork(i + 1, s, t);
        }

        var result = [];
        fork();
        return result;
    };

    const subsetsOptions = getSubsetsOptions();
    const result = getSubsets(subsetsOptions, methodsSum);

    return result.join().split(',');
};
export const convertPresetPropertiesForUpdate = (preset: any, name: string) => {
    let presetWithConvertedProperties = { ...preset, presetName: name };
    if (preset.methodProcessing != null) {
        const convertedMethodProcessing = convertMethodProcessingStringToEnum(
            preset.methodProcessing,
        );
        presetWithConvertedProperties = {
            ...presetWithConvertedProperties,
            methodProcessing: convertedMethodProcessing,
        };
    }
    if (preset.blockStartHeight) {
        presetWithConvertedProperties = {
            ...presetWithConvertedProperties,
            startBy: 'block',
        };
    }
    if (preset.blockEndHeight) {
        presetWithConvertedProperties = {
            ...presetWithConvertedProperties,
            endBy: 'block',
        };
    }

    if (preset.isUsdValue) {
        presetWithConvertedProperties = {
            ...presetWithConvertedProperties,
            currency: preset.isUsdValue ? 'usd' : 'eth',
        };
    }

    return presetWithConvertedProperties;
};

export const getFormattedPresetToUpdate = (
    preset: IPreset,
    form: IPresetForm,
): Observable<any> => {
    const formWithNoEmptyValues = removeEmptyValues(form);
    const formattedPresetToUpdate = {
        ...preset,
    };
    const formKeysToUpdate = Object.keys(formWithNoEmptyValues);
    for (const property in formattedPresetToUpdate.definition) {
        if (formKeysToUpdate.includes(property)) {
            formattedPresetToUpdate.definition[property] =
                formWithNoEmptyValues[property];
        }
    }
    if (formKeysToUpdate.includes('presetName')) {
        formattedPresetToUpdate.name = formWithNoEmptyValues.presetName;
        delete formattedPresetToUpdate.definition.presetName;
    }

    const translatedPresetValues = translateFormValuesAndTypes(
        preset.definition,
    );
    return of({
        ...formattedPresetToUpdate,
        definition: translatedPresetValues,
    });
};
