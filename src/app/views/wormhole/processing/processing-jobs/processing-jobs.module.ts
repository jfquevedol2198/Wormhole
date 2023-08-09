import { ChipModule } from 'src/app/components/chip/chip.module';
import { DynamicTableModule } from 'src/app/components/dynamic-table/dynamic-table.module';
import { NoDataCommunicateModule } from 'src/app/components/no-data-communicate/no-data-communicate.module';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { TableHeaderModule } from 'src/app/components/table-header/table-header.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProcessingJobsFilteringModule } from './processing-jobs-filters/processing-jobs-filters.module';
import { ProcessingJobsComponent } from './processing-jobs.component';

@NgModule({
    declarations: [ProcessingJobsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        DynamicTableModule,
        MatProgressSpinnerModule,
        ProcessingJobsFilteringModule,
        FormsModule,
        ReactiveFormsModule,
        NoDataCommunicateModule,
        MatTableModule,
        TableHeaderModule,
        MatTooltipModule,
        ChipModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        PaginatorModule,
    ],
    providers: [],
    exports: [ProcessingJobsComponent],
})
export class ProcessingJobsModule {}
