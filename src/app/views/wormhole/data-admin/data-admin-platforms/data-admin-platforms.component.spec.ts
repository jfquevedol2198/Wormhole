import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminPlatformsComponent } from './data-admin-platforms.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DataAdminPlatformsComponent', () => {
  let component: DataAdminPlatformsComponent;
  let fixture: ComponentFixture<DataAdminPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [ DataAdminPlatformsComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
