import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AdvancedToggleComponent } from './advanced-toggle.component';

@NgModule({
    declarations: [AdvancedToggleComponent],
    imports: [CommonModule, MatSlideToggleModule],
    providers: [],
    exports: [AdvancedToggleComponent],
})
export class AdvancedToggleModule {}
