import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminMarketDataMarketToMarketComponent } from './data-admin-market-data-market-to-market.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('DataAdminMarketDataMarketToMarketComponent', () => {
  let component: DataAdminMarketDataMarketToMarketComponent;
  let fixture: ComponentFixture<DataAdminMarketDataMarketToMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ DataAdminMarketDataMarketToMarketComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminMarketDataMarketToMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
