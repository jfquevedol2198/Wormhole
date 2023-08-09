import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusMessageComponent } from './status-message.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [StatusMessageComponent],
    imports: [CommonModule, MatIconModule],
    exports: [StatusMessageComponent],
})
export class StatusMessageModule {}
