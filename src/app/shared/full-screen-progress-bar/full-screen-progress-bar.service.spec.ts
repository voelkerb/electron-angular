import { TestBed } from '@angular/core/testing';

import { FullScreenProgressBarService } from './full-screen-progress-bar.service';

describe('FullScreenProgressBarService', () => {
  let service: FullScreenProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreenProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
