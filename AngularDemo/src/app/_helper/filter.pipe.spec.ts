import { TestBed } from '@angular/core/testing';

import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterPipe = TestBed.get(FilterPipe);
    expect(service).toBeTruthy();
  });
});
