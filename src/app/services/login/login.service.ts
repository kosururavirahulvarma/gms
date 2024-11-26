import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Loginmodel, User } from '../../model/Loginmodel';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private snackBar = inject(MatSnackBar);
  constructor(private http: HttpClient, private cookies: CookieService) {}
  proceedlogin(_data: Loginmodel) {
    return this.http.get<User[]>(
      'http://localhost:3000/user?id=' +
        _data.username +
        '&&password=' +
        _data.password
    );
  }

  isLoggedIn() {
    let isLoggedIn = this.cookies.get('username');
    if (isLoggedIn === '') {
      this.snackBar.open(
        'You must be logged in to access this application. Please log in first.',
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
    }
    return isLoggedIn != '';
  }
}
