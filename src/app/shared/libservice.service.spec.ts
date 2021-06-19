import { TestBed } from '@angular/core/testing';

import { LibserviceService } from './libservice.service';

describe('LibserviceService', () => {
  let service: LibserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
