import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticatedGuard } from '../../../guard/authentication.guard';
import { IUserRoles } from '../../../interfaces/setting.interface';
import { WormholeFullscreenComponent } from './wormhole-fullscreen.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WormholeFullscreenComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'chart',
                    },
                    {
                        path: 'chart',
                        canActivate: [AuthenticatedGuard],
                        data: {
                            title: 'Chart',
                            disabled: true,
                            availableFor: [
                                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                            ],
                        },
                        loadChildren: () =>
                            import('./chart/chart.module').then(
                                (m) => m.ChartModule,
                            ),
                    },
                    {
                        path: 'transactions',
                        canActivate: [AuthenticatedGuard],
                        data: {
                            title: 'Transactions',
                            disabled: true,
                            availableFor: [
                                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                            ],
                        },
                        loadChildren: () =>
                            import(
                                './transactions-fullscreen/transactions-fullscreen.module'
                            ).then((m) => m.TransactionsFullscreenModule),
                    },
                    {
                        path: 'de-fi-impact',
                        canActivate: [AuthenticatedGuard],
                        data: {
                            title: 'DeFi Impact',
                            disabled: true,
                            availableFor: [
                                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                            ],
                        },
                        loadChildren: () =>
                            import(
                                './de-fi-impact-fullscreen/de-fi-impact-fullscreen.module'
                            ).then((m) => m.DeFiImpactFullscreenModule),
                    },
                    {
                        path: 'inventory',
                        canActivate: [AuthenticatedGuard],
                        data: {
                            title: 'Inventory',
                            disabled: true,
                            availableFor: [
                                IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
                                IUserRoles.ROLE_USER_DATA_VALIDATOR,
                            ],
                        },
                        loadChildren: () =>
                            import(
                                './inventory-fullscreen/inventory-fullscreen.module'
                            ).then((m) => m.InventoryFullscreenModule),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WormholeFullscreenRoutingModule {}
