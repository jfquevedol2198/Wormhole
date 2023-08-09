import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, RouterModule, MatTabsModule, MatIconModule],
    exports: [MenuComponent],
})
export class MenuModule {}
