import { TestBed } from '@angular/core/testing';

import { LocalData } from './local-data';

describe('LocalData', () => {
  let service: LocalData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
