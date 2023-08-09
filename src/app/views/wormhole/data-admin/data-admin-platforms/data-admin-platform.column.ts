import { IDataAdminPlatform } from 'src/app/interfaces/dataadminPlatforms.interface';

export const dataAdminPlatformsColumns = [
    {
        columnDef: ' ',
        header: ' ',
        columnType: 'is-selected-icon',
        isSortable: false,
    },
    {
        columnDef: 'platformNames',
        header: 'Platform Names',
        columnType: '',
        isSortable: true,
        cell: (platform: IDataAdminPlatform) => platform.platformName,
    },
    {
        columnDef: 'scorePercent',
        header: 'Score %',
        columnType: '',
        isSortable: true,
        cell: (platform: IDataAdminPlatform) => platform.scorePercent,
    },
    {
        columnDef: 'scam',
        header: 'Scam',
        columnType: 'slideToggle',
        isSortable: true,
    },
    {
        columnDef: 'platformLogo',
        header: 'Platform Logo',
        columnType: '',
        isSortable: true,
        cell: (platform: IDataAdminPlatform) => platform.platformLogo,
    },
    {
        columnDef: 'action',
        header: 'Action',
        columnType: 'more-options',
        isSortable: false,
    },
];
