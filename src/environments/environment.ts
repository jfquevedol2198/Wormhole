export const environment = {
    production: false,
    wormholes: [
        {
            url: 'http://localhost:3000/api',
            name: 'Local',
            default: true,
        },
        {
            url: 'https://dev.redkite.app/api',
            name: 'DEV',
            default: false,
        },
        {
            url: 'https://dev1.redkite.app/api',
            name: 'DEV1',
            default: false,
        },

        {
            url: 'https://dev2.redkite.app/api',
            name: 'DEV2',
            default: false,
        },

        {
            url: 'https://dev3.redkite.app/api',
            name: 'DEV3',
            default: false,
        },
        {
            url: 'https://sit1.redkite.app/api',
            name: 'SIT1',
            default: false,
        },
        {
            url: 'https://sit2.redkite.app/api',
            name: 'SIT2',
            default: false,
        },
        {
            url: 'https://sit3.redkite.app/api',
            name: 'SIT3',
            default: false,
        },
        {
            url: 'https://redkite.app/api',
            name: 'PROD',
            default: false,
        },
    ],
};
