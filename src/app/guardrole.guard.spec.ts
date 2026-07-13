import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardroleGuard } from './guardrole.guard';

describe('guardroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
