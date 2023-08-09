import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportHistoryComponent } from './report-history.component';

const routes: Routes = [
    {
        path: '',
        component: ReportHistoryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportHistoryRoutesModule {}
