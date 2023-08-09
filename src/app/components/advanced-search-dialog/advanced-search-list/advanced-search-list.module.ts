import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AdvancedSearchListComponent } from './advanced-search-list.component';

@NgModule({
    declarations: [AdvancedSearchListComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
    ],
    exports: [AdvancedSearchListComponent],
    providers: [AdvancedSearchService],
})
export class AdvancedSearchListModule {}
