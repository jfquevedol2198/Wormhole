import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { EditModeAlertDialogComponent } from './edit-mode-alert-dialog.component';

@NgModule({
    declarations: [EditModeAlertDialogComponent],
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
})
export class EditModeAlertDialogModule {}
