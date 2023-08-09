import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsJobsComponent } from './data-admin-currency-pairs-jobs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('DataAdminCurrencyPairsJobsComponent', () => {
  let component: DataAdminCurrencyPairsJobsComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ DataAdminCurrencyPairsJobsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
