import { TestBed } from '@angular/core/testing';

import { ValtransService } from './valtrans.service';

describe('ValtransService', () => {
  let service: ValtransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValtransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
