import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MomentDatePipe } from './moment-date.pipe';

@NgModule({
    declarations: [MomentDatePipe],
    imports: [CommonModule],
    exports: [MomentDatePipe],
})
export class MomentDatePipeModule {}
