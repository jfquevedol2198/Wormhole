const isObjEmpty = (obj) => {
    for (const k in obj) {
        return obj === null || Object.keys(obj).length === 0 || obj[k] === '';
    }
    return;
};

export const removeEmptyValues = (obj: any) => {
    for (const propName in obj) {
        if (
            obj[propName] === null ||
            obj[propName] === undefined ||
            obj[propName] === '' ||
            (typeof obj[propName] === 'object' && isObjEmpty(obj[propName]))
        ) {
            delete obj[propName];
        }
    }
    return obj;
};
