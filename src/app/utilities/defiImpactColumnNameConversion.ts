export const defiImpactColumnNameToDBColumnName = (
    columnName: string,
    sortingBy: 'usd' | 'diffPercentage',
): string => {
    return columnName === 'assetName'
        ? columnName
        : columnName.startsWith('pnl') ||
          columnName.startsWith('exchangeRate') ||
          columnName.startsWith('netWorth')
        ? columnName + (sortingBy === 'usd' ? 'Closing' : 'DiffPercentage')
        : columnName + (sortingBy === 'usd' ? 'ClosingUsd' : 'DiffPercentage');
};

export const dbColumnNameToDeFiImpactColumnName = (
    columnName: string,
    sortingBy: 'usd' | 'diffPercentage',
): string => {
    return columnName === 'assetName'
        ? columnName
        : columnName.startsWith('pnl') ||
          columnName.startsWith('exchangeRate') ||
          columnName.startsWith('netWorth')
        ? columnName.replace(
              sortingBy === 'usd' ? 'Closing' : 'DiffPercentage',
              '',
          )
        : columnName.replace(
              sortingBy === 'usd' ? 'ClosingUsd' : 'DiffPercentage',
              '',
          );
};

export const convertDBColumnNameAfterSortingByChanged = (
    columnName: string,
) => {
    return columnName === 'assetName'
        ? columnName
        : columnName.endsWith('Closing')
        ? columnName.replace('Closing', 'DiffPercentage')
        : columnName.endsWith('ClosingUsd')
        ? columnName.replace('ClosingUsd', 'DiffPercentage')
        : columnName.endsWith('DiffPercentage') &&
          (columnName.startsWith('pnl') ||
              columnName.startsWith('exchangeRate') ||
              columnName.startsWith('netWorth'))
        ? columnName.replace('DiffPercentage', 'Closing')
        : columnName.replace('DiffPercentage', 'ClosingUsd');
};
