import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { BlockchainService } from '../../../services/blockchain/blockchain.service';
import { ReferenceDataService } from '../../../services/reference-data/reference-data.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { AddAddressDialogComponent } from './add-address-dialog.component';
import { AddAddressManuallyDialogComponent } from './add-address-manually-dialog.component';
import { AddPortfolioDialogComponent } from './add-portfolio-dialog.component';
import { AddressesTableModule } from './addresses-table/addresses-table.module';
import { AlertDialogComponent } from './alert-dialog.component';
import { ModifyPortfolioDialogComponent } from './modify-portfolio-dialog.component';
import { PortfolioManagementComponent } from './portfolio-management.component';

@NgModule({
    declarations: [
        PortfolioManagementComponent,
        AddPortfolioDialogComponent,
        AddAddressManuallyDialogComponent,
        ModifyPortfolioDialogComponent,
        AddAddressDialogComponent,
        AlertDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PortfolioManagementComponent,
            },
        ]),
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatExpansionModule,
        MatInputModule,
        MatTooltipModule,
        MatMenuModule,
        AddressesTableModule,
    ],
    providers: [
        ApiService,
        WormholeService,
        AccountingService,
        ReferenceDataService,
        BlockchainService,
    ],
})
export class PortfolioManagementModule {}
