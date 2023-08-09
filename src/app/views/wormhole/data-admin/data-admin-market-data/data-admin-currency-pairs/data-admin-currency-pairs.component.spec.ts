import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsComponent } from './data-admin-currency-pairs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('DataAdminCurrencyPairsComponent', () => {
  let component: DataAdminCurrencyPairsComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ DataAdminCurrencyPairsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
