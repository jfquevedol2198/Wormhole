import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { AdvancedSearchDialogComponent } from './advanced-search-dialog.component';
import { AccountingService } from 'src/app/services/accounting/accounting.service';
import { AdvancedSearchListModule } from './advanced-search-list/advanced-search-list.module';
import { AdvancedSearchFormModule } from './advanced-search-form/advanced-search-form.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StatusMessageModule } from '../status-message/status-message.module';

@NgModule({
    declarations: [AdvancedSearchDialogComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatListModule,
        AdvancedSearchListModule,
        AdvancedSearchFormModule,
        NgScrollbarModule,
        StatusMessageModule,
    ],
    exports: [AdvancedSearchDialogComponent],
    providers: [AccountingService],
    entryComponents: [AdvancedSearchDialogComponent],
})
export class AdvancedSearchDialogModule {}
