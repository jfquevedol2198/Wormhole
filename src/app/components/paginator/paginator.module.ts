import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PaginatorExtendComponent } from './paginator-extend.component';
import { PaginatorComponent } from './paginator.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTooltipModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
    exports: [PaginatorComponent],
    declarations: [PaginatorExtendComponent, PaginatorComponent],
})
export class PaginatorModule {}
