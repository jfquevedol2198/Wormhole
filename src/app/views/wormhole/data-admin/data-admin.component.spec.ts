import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminComponent } from './data-admin.component';
import { GeneralLedgerService } from '../general-ledger/general-ledger.service';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataAdminComponent', () => {
  let component: DataAdminComponent;
  let fixture: ComponentFixture<DataAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ DataAdminComponent ],
      providers: [
        GeneralLedgerService,
        AccountingService,
        ApiService,
        DataQualityCheckService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
