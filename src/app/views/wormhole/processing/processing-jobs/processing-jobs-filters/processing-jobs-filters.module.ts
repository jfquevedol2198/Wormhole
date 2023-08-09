import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProcessingJobsFiltersComponent } from './processing-jobs-filters.component';

@NgModule({
    declarations: [ProcessingJobsFiltersComponent],
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
    providers: [],
    exports: [ProcessingJobsFiltersComponent],
})
export class ProcessingJobsFilteringModule {}
