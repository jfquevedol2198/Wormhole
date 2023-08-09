import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FooterModule } from '../footer/footer.module';
import { MenuModule } from '../menu/menu.module';
import { ThemeToggleModule } from '../theme-toggle/theme-toggle.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { ConnectWalletDialogComponent } from './connect-wallet-dialog.component';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [MainComponent, ConnectWalletDialogComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        FooterModule,
        ThemeToggleModule,
        MenuModule,
        UserSettingsModule,
        MatMenuModule,
        MatDialogModule,
    ],
    exports: [MainComponent],
})
export class MainModule {}
