import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminAddressLabelsJobsComponent } from './data-admin-address-labels-jobs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('DataAdminAddressLabelsJobsComponent', () => {
  let component: DataAdminAddressLabelsJobsComponent;
  let fixture: ComponentFixture<DataAdminAddressLabelsJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      declarations: [ DataAdminAddressLabelsJobsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminAddressLabelsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
