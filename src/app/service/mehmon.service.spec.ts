import { TestBed } from '@angular/core/testing';

import { MehmonService } from './mehmon.service';

describe('MehmonService', () => {
  let service: MehmonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MehmonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
