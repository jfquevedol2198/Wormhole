import {
    ISortColumn,
    SortDirection,
} from '../interfaces/sort-column.interface';

export const getOppositeDirection = (
    direction: 'asc' | 'desc',
): SortDirection => {
    return direction === 'asc' ? 'desc' : 'asc';
};

export const getSortQuery = (
    isButtonPressed: boolean,
    columnDef: string,
    sortColumns: ISortColumn[],
): { sortQuery: string; sortColumns: ISortColumn[] } => {
    if (isButtonPressed) {
        if (sortColumns.some((column) => column.columnDef === columnDef)) {
            sortColumns = sortColumns.filter(
                (column) => column.columnDef !== columnDef,
            );
        } else {
            sortColumns.push({ columnDef, direction: 'asc' });
        }
    } else {
        if (sortColumns.some((column) => column.columnDef === columnDef)) {
            sortColumns.forEach((column) => {
                if (column.columnDef === columnDef) {
                    column.direction = getOppositeDirection(column.direction);
                }
            });
        } else {
            sortColumns = [{ columnDef, direction: 'asc' }];
        }
    }

    const sortQuery = sortColumns.map((column) => {
        return column.columnDef + ' ' + column.direction;
    });

    return {
        sortQuery: JSON.stringify(sortQuery),
        sortColumns,
    };
};
