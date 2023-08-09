import { DateRangeInputsModule } from 'src/app/components/date-range-inputs/date-range-inputs.module';
import { DatePipeModule } from 'src/app/pipes/date/date.pipe.module';
import { SubLedgersService } from 'src/app/services/sub-ledgers/sub-ledgers.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NoDataCommunicateModule } from '../../../../components/no-data-communicate/no-data-communicate.module';
import { AuditService } from '../../../../services/audit/audit.service';
import { TransactionsTableModule } from '../../general-ledger/general-ledger-table/transactions-table/transactions-table.module';
import { SubLedgersTableComponent } from './sub-ledgers-table.component';

@NgModule({
    declarations: [SubLedgersTableComponent],
    exports: [SubLedgersTableComponent],
    imports: [
        CommonModule,
        DatePipeModule,
        MatDialogModule,
        MatTooltipModule,
        TransactionsTableModule,
        DateRangeInputsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NoDataCommunicateModule,
    ],
    providers: [SubLedgersService, AuditService],
})
export class SubLedgersTableModule {}
