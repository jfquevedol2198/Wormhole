import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminMarketDataProvidersJobsComponent } from './data-admin-market-data-providers-jobs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataAdminMarketDataProvidersJobsComponent', () => {
  let component: DataAdminMarketDataProvidersJobsComponent;
  let fixture: ComponentFixture<DataAdminMarketDataProvidersJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DataAdminMarketDataProvidersJobsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminMarketDataProvidersJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
