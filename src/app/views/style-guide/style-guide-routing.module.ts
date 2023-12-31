import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StyleGuideComponent } from './style-guide.component';

export const routes: Routes = [
    {
        path: '',
        component: StyleGuideComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StyleGuideRoutingModule {}
