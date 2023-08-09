import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { TransactionsTableModule } from '../general-ledger/general-ledger-table/transactions-table/transactions-table.module';
import { SubLedgersMessagesModule } from './sub-ledgers-messages/sub-ledgers-messages.module';
import { SubLedgersRoutesModule } from './sub-ledgers-routing.module';
import { SubLedgersTableModule } from './sub-ledgers-table/sub-ledgers-table.module';
import { SubLedgersComponent } from './sub-ledgers.component';

@NgModule({
    declarations: [SubLedgersComponent],
    exports: [SubLedgersComponent],
    imports: [
        CommonModule,
        SubLedgersMessagesModule,
        SubLedgersRoutesModule,
        MatTabsModule,
        SubLedgersTableModule,
        TransactionsTableModule,
        MatProgressSpinnerModule,
    ],
    providers: [],
})
export class SubLedgersModule {}
