import { TestBed } from '@angular/core/testing';

import { PinboardService } from './pinboard.service';

describe('PinboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinboardService = TestBed.get(PinboardService);
    expect(service).toBeTruthy();
  });
});
