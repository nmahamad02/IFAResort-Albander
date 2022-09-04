import { TestBed } from '@angular/core/testing';

import { ClubserviceService } from './clubservice.service';

describe('ClubserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubserviceService = TestBed.get(ClubserviceService);
    expect(service).toBeTruthy();
  });
});
