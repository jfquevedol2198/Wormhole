import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinGekoErrorDialogComponent } from './coin-geko-error-dialog.component';

describe('CoinGekoErrorDialogComponent', () => {
  let component: CoinGekoErrorDialogComponent;
  let fixture: ComponentFixture<CoinGekoErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinGekoErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinGekoErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
