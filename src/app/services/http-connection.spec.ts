import { TestBed } from '@angular/core/testing';

import { HttpConnection } from './http-connection';

describe('HttpConnection', () => {
  let service: HttpConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpConnection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
