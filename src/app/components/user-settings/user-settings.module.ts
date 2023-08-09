import { AccountingService } from 'src/app/services/accounting/accounting.service';
import { DataQualityCheckService } from 'src/app/services/dataQualityCheck/dataQualityCheck.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AdvancedToggleModule } from '../advanced-toggle/advanced-toggle.module';
import { PnlProgressDialogModule } from '../pnl-progress-dialog/pnl-progress-dialog.module';
import { ThemeToggleModule } from '../theme-toggle/theme-toggle.module';
import { UserSettingsComponent } from './user-settings.component';

@NgModule({
    declarations: [UserSettingsComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatBadgeModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        ThemeToggleModule,
        AdvancedToggleModule,
        PnlProgressDialogModule,
        ReactiveFormsModule,
    ],
    providers: [AccountingService, DataQualityCheckService],
    exports: [UserSettingsComponent],
})
export class UserSettingsModule {}
