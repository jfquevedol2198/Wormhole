import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiService } from '../../../services/api/api.service';
import { WormholeService } from '../../../services/wormhole/wormhole.service';

import { LogRoutesModule } from './log-routing.module';

import { LogComponent } from './log.component';

@NgModule({
    declarations: [LogComponent],
    imports: [CommonModule, MatSelectModule, MatToolbarModule, LogRoutesModule],
    providers: [ApiService, WormholeService],
})
export class LogModule {}
