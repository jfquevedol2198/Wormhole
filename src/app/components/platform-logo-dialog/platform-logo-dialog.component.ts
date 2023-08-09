import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPlatformLogo } from 'src/app/interfaces/platformLogo.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-platform-logo-dialog',
  templateUrl: './platform-logo-dialog.component.html',
  styleUrls: ['./platform-logo-dialog.component.scss']
})
export class PlatformLogoDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PlatformLogoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPlatformLogo,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      platformIcon: [this.data.platformIcon]
    });
  }

  handleUpdate() {
    this.data.platformIcon = this.form.value.platformIcon;
    this.dialogRef.close({ platformIcon: this.form.value.platformIcon });
  }

}
