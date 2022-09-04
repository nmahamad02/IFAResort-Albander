import { TestBed } from '@angular/core/testing';

import { CrmService } from './crm.service';

describe('CrmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrmService = TestBed.get(CrmService);
    expect(service).toBeTruthy();
  });
});
