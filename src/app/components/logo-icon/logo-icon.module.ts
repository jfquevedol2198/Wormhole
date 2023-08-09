import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LogoIconComponent } from './logo-icon.component';

@NgModule({
    declarations: [LogoIconComponent],
    imports: [CommonModule, MatTooltipModule],
    exports: [LogoIconComponent],
})
export class LogoIconModule {}
