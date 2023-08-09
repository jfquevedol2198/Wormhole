import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppTooltipComponent } from './app-tooltip.component';

@NgModule({
    declarations: [AppTooltipComponent],
    imports: [CommonModule, NgxTippyModule],
    exports: [AppTooltipComponent],
})
export class AppTooltipModule { }
