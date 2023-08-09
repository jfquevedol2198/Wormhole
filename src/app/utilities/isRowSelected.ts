export const isRowSelected = (row: any, selectedRowsWithData: any[]): boolean => {
    return (
        selectedRowsWithData.filter(
            (selectedRowWithData) => selectedRowWithData.row === row,
        ).length > 0
    );
};
