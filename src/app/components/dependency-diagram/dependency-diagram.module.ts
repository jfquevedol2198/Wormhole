import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyDiagramComponent } from './dependency-diagram.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ DependencyDiagramComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ DependencyDiagramComponent ]
})
export class DependencyDiagramModule { }
