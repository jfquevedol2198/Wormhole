import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubLedgersComponent } from './sub-ledgers.component';

const routes: Routes = [
    {
        path: '',
        component: SubLedgersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubLedgersRoutesModule {}
