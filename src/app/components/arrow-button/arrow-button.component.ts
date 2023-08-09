import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-arrow-button',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.scss']
})
export class ArrowButtonComponent {
  @Input() label: string;
  @Input() index: number;
  @Input() selectIndex: number;
  @Input() status: string;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  onClickButton() {
    this.onClick.emit(this.index);
  }
  getClassname() {
    let classname = 'item-outer ';
    if (this.selectIndex === this.index) classname += 'current ';
    classname += this.status;
    return classname;
  }
}
