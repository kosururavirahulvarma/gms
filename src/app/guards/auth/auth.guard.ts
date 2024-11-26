import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let service = inject(LoginService);
  if (service.isLoggedIn()) {
    return true;
  } else {
    alert(
      'You must be logged in to access this application. Please log in first.'
    );
    router.navigateByUrl('/login');
    return false;
  }
};
