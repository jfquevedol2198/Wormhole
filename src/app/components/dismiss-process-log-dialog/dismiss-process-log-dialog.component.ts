import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dismiss-process-log-dialog',
  templateUrl: './dismiss-process-log-dialog.component.html',
  styleUrls: ['./dismiss-process-log-dialog.component.scss']
})
export class DismissProcessLogDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      note: ['']
    });
  }

}
