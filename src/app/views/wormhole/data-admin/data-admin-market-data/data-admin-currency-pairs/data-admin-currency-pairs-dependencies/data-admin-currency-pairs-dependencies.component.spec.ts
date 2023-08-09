import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsDependenciesComponent } from './data-admin-currency-pairs-dependencies.component';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataAdminCurrencyPairsDependenciesComponent', () => {
  let component: DataAdminCurrencyPairsDependenciesComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsDependenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ DataAdminCurrencyPairsDependenciesComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
