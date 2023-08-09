import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./views/home-page/home-page.module').then(
                (m) => m.HomePageModule,
            ),
    },
    {
        path: 'app',
        loadChildren: () =>
            import('./views/wormhole/wormhole.module').then(
                (m) => m.WormholeModule,
            ),
    },
    {
        path: 'release',
        loadChildren: () =>
            import('./views/release/release.module').then(
                (m) => m.ReleaseModule,
            ),
    },
    {
        path: 'style-guide',
        loadChildren: () =>
            import('./views/style-guide/style-guide.module').then(
                (m) => m.StyleGuideModule,
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
