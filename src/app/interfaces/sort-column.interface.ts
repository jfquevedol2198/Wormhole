export interface ISortColumn {
    columnDef: string;
    direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc';
