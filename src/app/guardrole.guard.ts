import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const guardroleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = localStorage.getItem('role');

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};