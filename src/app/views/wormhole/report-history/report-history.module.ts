import { AdvancedSearchDialogModule } from 'src/app/components/advanced-search-dialog/advanced-search-dialog.module';
import { MomentDatePipeModule } from 'src/app/pipes/moment-date/moment-date.module';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';
import { ReportHistoryService } from 'src/app/services/report-history/report-history.service';
import { WorkersService } from 'src/app/services/workers/workers.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StatusMessageModule } from '../../../components/status-message/status-message.module';
import { ApiService } from '../../../services/api/api.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { ReportHistoryCalendarModule } from './report-history-calendar/report-history-calendar.module';
import { ReportHistoryRoutesModule } from './report-history-routing.module';
import { ReportHistoryTableModule } from './report-history-table/report-history-table.module';
import { ReportHistoryComponent } from './report-history.component';

@NgModule({
    declarations: [ReportHistoryComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatToolbarModule,
        ReportHistoryRoutesModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        MatExpansionModule,
        AdvancedSearchDialogModule,
        MatDialogModule,
        MatTooltipModule,
        ReportHistoryTableModule,
        StatusMessageModule,
        MatFormFieldModule,
        MomentDatePipeModule,
        ReportHistoryCalendarModule,
    ],
    providers: [
        ApiService,
        WormholeService,
        AdvancedSearchService,
        ReportHistoryService,
        WorkersService,
    ],
})
export class ReportHistoryModule {}
