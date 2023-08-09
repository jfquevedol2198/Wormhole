import { IAsset } from '../interfaces/asset.interface';
import { IPlatform } from '../interfaces/platform.interface';
import { ISortColumn } from '../interfaces/sort-column.interface';
import { convertSortColumnNameForInventory } from './convertSortColumnNameForInventory';

export const sortInventoryElements = (
    first: IAsset | IPlatform,
    second: IAsset | IPlatform,
    sortColumns: ISortColumn[],
): number => {
    const [sortColumn, ...othersColumns] = sortColumns;
    const firstValue =
        first.positions[0][
            convertSortColumnNameForInventory(sortColumn.columnDef)
        ];
    const secondValue =
        second.positions[0][
            convertSortColumnNameForInventory(sortColumn.columnDef)
        ];

    if (sortColumn.direction === 'asc') {
        if (firstValue > secondValue) {
            return 1;
        }

        if (firstValue < secondValue) {
            return -1;
        }

        return othersColumns.length
            ? sortInventoryElements(first, second, othersColumns)
            : 0;
    } else {
        if (firstValue < secondValue) {
            return 1;
        }

        if (firstValue > secondValue) {
            return -1;
        }

        return othersColumns.length
            ? sortInventoryElements(first, second, othersColumns)
            : 0;
    }
};
