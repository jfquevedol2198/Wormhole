import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminMethodDefinitionsJobsComponent } from './data-admin-method-definitions-jobs.component';

describe('DataAdminMethodDefinitionsJobsComponent', () => {
  let component: DataAdminMethodDefinitionsJobsComponent;
  let fixture: ComponentFixture<DataAdminMethodDefinitionsJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAdminMethodDefinitionsJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminMethodDefinitionsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
