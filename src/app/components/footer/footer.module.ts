import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VersionInfoModule } from '../version-info/version-info.module';

import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, RouterModule, VersionInfoModule],
    exports: [FooterComponent],
})
export class FooterModule {}
