import { TestBed } from '@angular/core/testing';

import { ReportErrorService } from './report-error.service';

describe('ReportErrorService', () => {
  let service: ReportErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
