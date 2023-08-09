import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsProcessingJobsComponent } from './data-admin-currency-pairs-processing-jobs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('DataAdminCurrencyPairsProcessingJobsComponent', () => {
  let component: DataAdminCurrencyPairsProcessingJobsComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsProcessingJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [ DataAdminCurrencyPairsProcessingJobsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsProcessingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
