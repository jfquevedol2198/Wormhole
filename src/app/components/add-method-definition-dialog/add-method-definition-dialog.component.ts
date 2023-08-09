import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TREATMENT } from '../../constants/treatment';
import { IDataAdminPlatform } from '../../interfaces/dataadminPlatforms.interface';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatProgressButtonOptions } from 'mat-progress-buttons';


interface IMethodDefinition {
  types: string[],
  platforms: IDataAdminPlatform[]
}
@Component({
  selector: 'app-add-method-definition-dialog',
  templateUrl: './add-method-definition-dialog.component.html',
  styleUrls: ['./add-method-definition-dialog.component.scss']
})
export class AddMethodDefinitionDialogComponent implements OnInit {
  form: FormGroup;
  listTreatments = [];
  isSubmitting: boolean = false;

  addButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Add definition',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'accent',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMethodDefinition,
    private dialogRef: MatDialogRef<AddMethodDefinitionDialogComponent>,
    private fb: FormBuilder,
    private apiService: DataAdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listTreatments = TREATMENT;
  }

  initForm() {
    this.form = this.fb.group({
      transactionHash: [''],
      platformId: [null, [Validators.required]],
      contractGroup: [''],
      transactionType: ['', [Validators.required]],
      methodId: ['', [Validators.required]],
      description: [''],
      signature: ['', Validators.required],
      treatmentPreset: [''],
      treatments: [[], [Validators.required]],
    })
  }

  onChangeTreatment(val) {
    const value = this.form.controls.treatments.value;
    const index = value.indexOf(val);
    if (index > -1) {
      value.splice(index, 1);
    } else {
      value.push(val);
    }
    this.form.controls.treatments.setValue(value)
  }

  onAdd() {
    if (this.form.valid) {
      const { platformId, methodId, signature, description, transactionType, treatments = [] } = this.form.value;
      this.isSubmitting = true;
      this.apiService.createMethodDefinitions({
        platformId,
        methodId,
        signature,
        description,
        transactionType,
        treatment: treatments.join(',')
      }).subscribe(res => {
        this.isSubmitting = false;
        this.dialogRef.close(true);
      }, err => {
        this.isSubmitting = false;
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: err.error?.message || 'Add New Method Definition failed',
          }
        })
      })
      
    } else {
      this.form.markAllAsTouched();
    }
  }
}
