import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WormholeSearchComponent } from './wormhole-search.component';

@NgModule({
    declarations: [WormholeSearchComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WormholeSearchComponent,
            },
        ]),
    ],
    exports: [WormholeSearchComponent],
})
export class WormholeSearchModule {}
