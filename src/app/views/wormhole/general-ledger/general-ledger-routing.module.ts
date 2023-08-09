import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralLedgerView0Component } from './general-ledger-view0.component';
import { GeneralLedgerView1Component } from './general-ledger-view1.component';
import { GeneralLedgerView2Component } from './general-ledger-view2.component';
import { GeneralLedgerSimpleViewComponent } from './general-ledger-simple-view.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '0',
        pathMatch: 'full',
    },
    {
        path: '0',
        component: GeneralLedgerView0Component,
    },
    {
        path: '1',
        component: GeneralLedgerView1Component,
    },
    {
        path: '2',
        component: GeneralLedgerView2Component,
    },
    {
        path: '3',
        component: GeneralLedgerSimpleViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralLedgerRoutesModule {}
