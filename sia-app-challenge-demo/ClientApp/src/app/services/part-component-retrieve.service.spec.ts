import { TestBed } from '@angular/core/testing';

import { PartComponentRetrieveService } from './part-component-retrieve.service';

describe('PartComponentRetrieveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartComponentRetrieveService = TestBed.get(PartComponentRetrieveService);
    expect(service).toBeTruthy();
  });
});
