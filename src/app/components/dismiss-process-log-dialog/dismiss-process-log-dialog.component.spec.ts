import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissProcessLogDialogComponent } from './dismiss-process-log-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DismissProcessLogDialogComponent', () => {
  let component: DismissProcessLogDialogComponent;
  let fixture: ComponentFixture<DismissProcessLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [ DismissProcessLogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissProcessLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
