import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginmodel, User } from '../../model/Loginmodel';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
    return this.cookies.get('username') != '';
  }
}
