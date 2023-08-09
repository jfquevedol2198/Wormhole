import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VersionInfoComponent } from './version-info.component';

@NgModule({
    declarations: [VersionInfoComponent],
    imports: [CommonModule],
    exports: [VersionInfoComponent],
})
export class VersionInfoModule {}
