import { TestBed, inject } from '@angular/core/testing';

import { PostUtilsService } from './post-utils.service';

describe('PostUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostUtilsService]
    });
  });

  it('should be created', inject([PostUtilsService], (service: PostUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
