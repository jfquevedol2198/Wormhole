import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddMethodDefinitionDialogComponent } from './add-method-definition-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorDialogModule } from '../error-dialog/error-dialog.module';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressButtonsModule } from 'mat-progress-buttons';


@NgModule({
  declarations: [ AddMethodDefinitionDialogComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    ErrorDialogModule,
    MatProgressButtonsModule.forRoot()
  ]
})
export class AddMethodDefinitionDialogModule { }
