import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataAdminPlatformsComponent } from './data-admin-platforms.component';


const routes: Routes = [
    {
        path: '',
        component: DataAdminPlatformsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataAdminPlatformsRoutesModule {}
