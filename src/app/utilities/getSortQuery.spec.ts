import { SortDirection } from '../interfaces/sort-column.interface';
import { getOppositeDirection, getSortQuery } from './getSortQuery';

describe('Get Sort Query', () => {
    let testAscColumn;
    const testAscQuery = '["test asc"]';
    let test1AscColumn;
    const test1AscQuery = '["test1 asc"]';
    let testDescColumn;
    const testDescQuery = '["test desc"]';
    let testDescAndTest1AscColumns;
    const testDescAndTest1AscQuery = '["test desc","test1 asc"]';
    let testAscAndTest1AscColumns;
    const testAscAndTest1AscQuery = '["test asc","test1 asc"]';
    beforeEach(() => {
        testAscColumn = [
            {
                columnDef: 'test',
                direction: 'asc' as SortDirection,
            },
        ];

        test1AscColumn = [
            {
                columnDef: 'test1',
                direction: 'asc' as SortDirection,
            },
        ];

        testDescColumn = [
            {
                columnDef: 'test',
                direction: 'desc' as SortDirection,
            },
        ];

        testDescAndTest1AscColumns = [
            {
                columnDef: 'test',
                direction: 'desc' as SortDirection,
            },
            {
                columnDef: 'test1',
                direction: 'asc' as SortDirection,
            },
        ];

        testAscAndTest1AscColumns = [
            {
                columnDef: 'test',
                direction: 'asc' as SortDirection,
            },
            {
                columnDef: 'test1',
                direction: 'asc' as SortDirection,
            },
        ];
    });

    it('should get sort query and sort columns for single column', () => {
        expect(getSortQuery(false, 'test', [])).toEqual({
            sortQuery: testAscQuery,
            sortColumns: testAscColumn,
        });

        expect(getSortQuery(false, 'test', testAscColumn)).toEqual({
            sortQuery: testDescQuery,
            sortColumns: testDescColumn,
        });

        expect(getSortQuery(false, 'test1', testAscColumn)).toEqual({
            sortQuery: test1AscQuery,
            sortColumns: test1AscColumn,
        });
    });

    it('should get sort query and sort columns for multi column', () => {
        expect(getSortQuery(true, 'test', [])).toEqual({
            sortQuery: testAscQuery,
            sortColumns: testAscColumn,
        });

        expect(getSortQuery(true, 'test', testAscColumn)).toEqual({
            sortQuery: '[]',
            sortColumns: [],
        });

        expect(getSortQuery(true, 'test1', testDescColumn)).toEqual({
            sortQuery: testDescAndTest1AscQuery,
            sortColumns: testDescAndTest1AscColumns,
        });

        expect(getSortQuery(false, 'test', testDescAndTest1AscColumns)).toEqual(
            {
                sortQuery: testAscAndTest1AscQuery,
                sortColumns: testAscAndTest1AscColumns,
            },
        );

        expect(getSortQuery(true, 'test', testDescAndTest1AscColumns)).toEqual({
            sortQuery: test1AscQuery,
            sortColumns: test1AscColumn,
        });
    });
});

describe('Get Opposite Direction', () => {
    it('should get opposite sorting direction', () => {
        expect(getOppositeDirection('asc')).toEqual('desc');
        expect(getOppositeDirection('desc')).toEqual('asc');
    });
});
