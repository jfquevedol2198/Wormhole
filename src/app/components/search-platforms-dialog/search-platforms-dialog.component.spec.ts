import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlatformsDialogComponent } from './search-platforms-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataAdminService } from '../../services/data-admin/data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchPlatformsDialogComponent', () => {
  let component: SearchPlatformsDialogComponent;
  let fixture: ComponentFixture<SearchPlatformsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [ SearchPlatformsDialogComponent ],
      providers: [
        DataAdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlatformsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
