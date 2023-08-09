import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminCurrencyPairsPairSummaryComponent } from './data-admin-currency-pairs-pair-summary.component';

describe('DataAdminCurrencyPairsPairSummaryComponent', () => {
  let component: DataAdminCurrencyPairsPairSummaryComponent;
  let fixture: ComponentFixture<DataAdminCurrencyPairsPairSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAdminCurrencyPairsPairSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminCurrencyPairsPairSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
