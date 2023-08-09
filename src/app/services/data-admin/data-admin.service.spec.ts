import { TestBed } from '@angular/core/testing';

import { DataAdminService } from './data-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';


describe('DataAdminService', () => {
  let service: DataAdminService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [ DataAdminService ]
    });
    service = TestBed.inject(DataAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
