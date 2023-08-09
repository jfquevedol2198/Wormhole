import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminMarketDataProvidersComponent } from './data-admin-market-data-providers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DataAdminMarketDataProvidersComponent', () => {
  let component: DataAdminMarketDataProvidersComponent;
  let fixture: ComponentFixture<DataAdminMarketDataProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ DataAdminMarketDataProvidersComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminMarketDataProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
