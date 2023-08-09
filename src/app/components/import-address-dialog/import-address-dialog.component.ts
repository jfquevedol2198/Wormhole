import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDataAdminPlatform } from '../../interfaces/dataadminPlatforms.interface';

interface IImportAddress {
  currencyType: string[],
  platforms: IDataAdminPlatform[]
}
@Component({
  selector: 'app-import-address-dialog',
  templateUrl: './import-address-dialog.component.html',
  styleUrls: ['./import-address-dialog.component.scss']
})
export class ImportAddressDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImportAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImportAddress,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [''],
      platform: [''],
      contract: [''],
      type: ['']
    })
  }
}
