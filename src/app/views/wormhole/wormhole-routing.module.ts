import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { childRoutes } from './wormhole.child-routes';
import { WormholeComponent } from './wormhole.component';

export const routes: Routes = [
    {
        path: '',
        component: WormholeComponent,
        children: childRoutes,
    },
    {
        path: 'fullscreen',
        loadChildren: () =>
            import('./wormhole-fullscreen/wormhole-fullscreen.module').then(
                (m) => m.WormholeFullscreenModule,
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WormholeRoutingModule {}
