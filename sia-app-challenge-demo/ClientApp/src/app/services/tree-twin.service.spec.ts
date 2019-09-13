import { TestBed } from '@angular/core/testing';

import { TreeTwinService } from './tree-twin.service';

describe('TreeTwinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeTwinService = TestBed.get(TreeTwinService);
    expect(service).toBeTruthy();
  });
});
