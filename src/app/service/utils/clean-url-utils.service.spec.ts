import { TestBed, inject } from '@angular/core/testing';

import { CleanUrlUtilsService } from './clean-url-utils.service';

describe('CleanUrlUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CleanUrlUtilsService]
    });
  });

  it('should be created', inject([CleanUrlUtilsService], (service: CleanUrlUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
