export const getTitleForAddressCell = (title: string) => {
    if (title.split(/[()]+/).length > 1) {
        return title.split(/[()]+/)[0];
    } else {
        return title.split(':')[0];
    }
};

export const getSubTitleForAddressCell = (title: string) => {
    if (title.split(/[()]+/).length > 1) {
        return title.split(/[()]+/)[1];
    } else {
        return title.split(':')[1];
    }
};
