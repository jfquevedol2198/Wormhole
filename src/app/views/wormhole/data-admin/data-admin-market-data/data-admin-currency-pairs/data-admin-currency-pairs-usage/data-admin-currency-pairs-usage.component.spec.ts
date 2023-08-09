import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsUsageComponent } from './data-admin-currency-pairs-usage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataAdminCurrencyPairsUsageComponent', () => {
  let component: DataAdminCurrencyPairsUsageComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ DataAdminCurrencyPairsUsageComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
