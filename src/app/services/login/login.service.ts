import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Loginmodel, User } from '../../model/Loginmodel';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private snackBar = inject(MatSnackBar);
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private toastr: ToastrService
  ) {}
  proceedlogin(_data: Loginmodel) {
    return this.http.get<User[]>(
      'http://localhost:3000/user?id=' +
        _data.username +
        '&&password=' +
        _data.password
    );
  }
  showErrorToast(message: string) {
    const toastConfig: Partial<IndividualConfig> = {
      timeOut: 3000, // 3 seconds
      positionClass: 'toast-top-center',
      closeButton: true,
      progressBar: true,
    };

    this.toastr.error(message, '', toastConfig);
  }
  isLoggedIn() {
    let isLoggedIn = this.cookies.get('username');
    if (isLoggedIn === '') {
      this.showErrorToast(
        'You must be logged in to access this application. Please log in first.'
      );
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
