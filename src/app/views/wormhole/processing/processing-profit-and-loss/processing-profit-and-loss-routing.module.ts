import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcessingProfitAndLossComponent } from './processing-profit-and-loss.component';

const routes: Routes = [
    {
        path: '',
        component: ProcessingProfitAndLossComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProcessingProfitAndLossRoutesModule {}
