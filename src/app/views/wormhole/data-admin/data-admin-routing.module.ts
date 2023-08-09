import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataAdminComponent } from './data-admin.component';

const routes: Routes = [
    {
        path: '',
        component: DataAdminComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataAdminRoutingModule {}
