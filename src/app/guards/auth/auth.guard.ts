import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let service = inject(LoginService);
  if (service.isLoggedIn()) {
    return true;
  } else {
    alert('Unauthorized access..');
    router.navigate(['/login'], {
      queryParams: { user: 'guest' },
    });
    return false;
  }
};
