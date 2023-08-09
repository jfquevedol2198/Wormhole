export const environment = {
    production: true,
    wormholes: [
        {
            url: '/api',
            name: 'Default',
            default: true,
        },
        {
            url: 'https://dev.redkite.app/api',
            name: 'DEV',
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
            url: 'https://redkite.app/api',
            name: 'PROD',
            default: false,
        },
    ],
};
