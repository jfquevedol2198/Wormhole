import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCodemirrorComponent } from './my-codemirror.component'
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

@NgModule({
  declarations: [ MyCodemirrorComponent ],
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule
  ],
  exports: [ MyCodemirrorComponent ]
})
export class MyCodemirrorModule { }
