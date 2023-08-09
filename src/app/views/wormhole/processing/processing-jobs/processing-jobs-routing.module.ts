import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcessingJobsComponent } from './processing-jobs.component';

const routes: Routes = [
    {
        path: '',
        component: ProcessingJobsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProcessingJobsRoutesModule {}
