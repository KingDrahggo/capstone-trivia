import { TestBed } from '@angular/core/testing';

import { TriviaServiceService } from './trivia-service.service';

describe('TriviaServiceService', () => {
  let service: TriviaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
