import { DatePipeModule } from 'src/app/pipes/date/date.pipe.module';
import { MomentDatePipeModule } from 'src/app/pipes/moment-date/moment-date.module';
import { SubLedgersService } from 'src/app/services/sub-ledgers/sub-ledgers.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BasicDynamicTableModule } from '../../../../components/basic-dynamic-table/basic-dynamic-table.module';
import { DateRangeInputsModule } from '../../../../components/date-range-inputs/date-range-inputs.module';
import { NoDataCommunicateModule } from '../../../../components/no-data-communicate/no-data-communicate.module';
import { SubLedgersMessagesComponent } from './sub-ledgers-messages.component';

@NgModule({
    declarations: [SubLedgersMessagesComponent],
    exports: [SubLedgersMessagesComponent],
    imports: [
        CommonModule,
        MatTableModule,
        DatePipeModule,
        MatTooltipModule,
        MomentDatePipeModule,
        BasicDynamicTableModule,
        MatProgressSpinnerModule,
        NoDataCommunicateModule,
        DateRangeInputsModule,
    ],
    providers: [SubLedgersService],
})
export class SubLedgersMessagesModule {}
