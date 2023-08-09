export const convertSortColumnNameForInventory = (columnName: string) => {
    if (columnName === 'name') {
        return 'assetName';
    } else {
        return columnName + 'Usd';
    }
};
