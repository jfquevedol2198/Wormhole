import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinGekoErrorDialogComponent } from './coin-geko-error-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MyCodemirrorModule } from '../my-codemirror/my-codemirror.module'

@NgModule({
  declarations: [ CoinGekoErrorDialogComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MyCodemirrorModule
  ]
})
export class CoinGekoErrorDialogModule { }
