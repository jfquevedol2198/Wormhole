import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChipComponent } from './chip.component';

@NgModule({
    declarations: [ChipComponent],
    imports: [CommonModule, MatChipsModule, MatTooltipModule],
    exports: [ChipComponent],
})
export class ChipModule {}
