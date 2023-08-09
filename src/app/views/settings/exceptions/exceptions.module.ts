import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { DatePipeModule } from '../../../pipes/date/date.pipe.module';

import { WormholeService } from '../../../services/wormhole/wormhole.service';

import { ExceptionsComponent } from './exceptions.component';

@NgModule({
    declarations: [ExceptionsComponent],
    imports: [CommonModule, MatCardModule, DatePipeModule],
    providers: [WormholeService],
    exports: [ExceptionsComponent],
})
export class ExceptionsModule {}
