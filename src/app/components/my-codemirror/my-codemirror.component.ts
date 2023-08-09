import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-codemirror',
  templateUrl: './my-codemirror.component.html',
  styleUrls: ['./my-codemirror.component.scss']
})
export class MyCodemirrorComponent implements OnInit {
  @Input() content: string;
  @Input() options: Object;

  constructor() { }

  ngOnInit(): void {
  }

  get config() {
    return {
      ...this.options,
      preserveScrollPosition: true,
      lineWrapping: true
    }
  }

}
