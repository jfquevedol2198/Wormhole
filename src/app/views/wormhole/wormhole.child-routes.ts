import { Routes } from '@angular/router';

import { AuthenticatedGuard } from '../../guard/authentication.guard';
import { IUserRoles } from '../../interfaces/setting.interface';

export const childRoutes: Routes = [
    {
        path: '',
        redirectTo: 'portfolio-management',
    },
    {
        path: 'portfolio-management',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'Portfolio Management',
            icon: 'manage_accounts',
            isAuthenticationRequired: false,
            isMenu: true,
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
            ],
        },
        loadChildren: () =>
            import('./portfolio-management/portfolio-management.module').then(
                (m) => m.PortfolioManagementModule,
            ),
    },
    {
        path: 'general-ledger',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'General Ledger',
            icon: 'all_inbox',
            isAuthenticationRequired: true,
            isMenu: true,
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
            ],
        },
        loadChildren: () =>
            import('./general-ledger/general-ledger-parent.module').then(
                (m) => m.GeneralLedgerParentModule,
            ),
    },
    {
        path: 'search',
        canActivate: [AuthenticatedGuard],
        data: {
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                IUserRoles.ROLE_USER_ADMINISTRATOR,
                IUserRoles.ROLE_USER_DATA_ADMIN,
            ],
        },
        loadChildren: () =>
            import('./wormhole-search/wormhole-search.module').then(
                (m) => m.WormholeSearchModule,
            ),
    },
    {
        path: 'notifications',
        canActivate: [AuthenticatedGuard],
        data: {
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                IUserRoles.ROLE_USER_ADMINISTRATOR,
                IUserRoles.ROLE_USER_DATA_ADMIN,
            ],
        },
        loadChildren: () =>
            import(
                './wormhole-notifications/wormhole-notifications.module'
            ).then((m) => m.WormholeNotificationsModule),
    },
    {
        path: 'sub-ledgers',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'Sub Ledgers',
            icon: 'inbox',
            isAuthenticationRequired: true,
            isMenu: true,
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
            ],
        },
        loadChildren: () =>
            import('./sub-ledgers/sub-ledgers.module').then(
                (m) => m.SubLedgersModule,
            ),
    },
    {
        path: 'processing',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'Processing',
            icon: 'model_training',
            isAuthenticationRequired: true,
            isMenu: true,
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
            ],
        },
        loadChildren: () =>
            import('./processing/processing.module').then(
                (m) => m.ProcessingModule,
            ),
    },
    {
        path: 'analytics',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'Analytics',
            icon: 'analytics',
            isAuthenticationRequired: true,
            isMenu: true,
            availableFor: [
                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                IUserRoles.ROLE_USER_DATA_VALIDATOR,
            ],
        },
        loadChildren: () =>
            import('./report-history/report-history.module').then(
                (m) => m.ReportHistoryModule,
            ),
    },
    {
        path: 'data-admin',
        canActivate: [AuthenticatedGuard],
        data: {
            title: 'Data Admin',
            icon: 'history',
            isAuthenticationRequired: true,
            isMenu: true,
            availableFor: [IUserRoles.ROLE_USER_DATA_ADMIN],
        },
        loadChildren: () =>
            import('./data-admin/data-admin.module').then(
                (m) => m.DataAdminModule,
            ),
    },
    {
        path: 'settings',
        canActivate: [AuthenticatedGuard],
        data: {
            availableFor: [IUserRoles.ROLE_USER_ADMINISTRATOR],
        },
        loadChildren: () =>
            import('../../views/settings/settings.module').then(
                (m) => m.SettingsModule,
            ),
    },
];
