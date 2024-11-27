import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Loginmodel } from '../../../model/Loginmodel';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loginConstants } from '../../../constants/Auth/login.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private cookies: CookieService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.initiateForm();
  }

  ngOnInit(): void {
    this.cookies.delete('username');
  }
  loginError = signal('');
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      const redirect = params['redirect'];
      const user = params['user'];
      console.log('Redirect:', redirect, 'User:', user);
      if (user != null && user == 'guest') {
        this.loginError.set(
          'You must be logged in to access this application. Please log in first.'
        );
      }
    });
  }

  errorUserNameMessage = signal('');
  errorPasswordMessage = signal('');

  loginForm!: FormGroup;
  initiateForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(loginConstants.REGULAREXPRESSION.PASSWORD),
        ],
      ],
    });
  }
  proceedLogin() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue();
      if (
        formValue.username === 'admin' &&
        formValue.password === 'Trade#123'
      ) {
        this.cookies.set('username', formValue.username);
        this.router.navigateByUrl('home');
      } else {
        this.toastr.error('Incorrect Credentials.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });

        this.errorUserNameMessage.set(
          loginConstants.ERRORMESSAGE.USERNAMEERROR.REQUIRED
        );
        this.errorPasswordMessage.set(
          loginConstants.ERRORMESSAGE.PASSWORDERROR.REQUIRED
        );
        this.loginForm.reset();

        // alert('Incorrect Credentials')
      }
    }
  }
  updateErrorMessage() {
    //UserName Validations
    if (this.loginForm.controls['username'].hasError('required')) {
      this.errorUserNameMessage.set(
        loginConstants.ERRORMESSAGE.USERNAMEERROR.REQUIRED
      );
    }

    //Password Validations
    if (this.loginForm.controls['password'].hasError('required')) {
      this.errorPasswordMessage.set(
        loginConstants.ERRORMESSAGE.PASSWORDERROR.REQUIRED
      );
    } else if (this.loginForm.controls['password'].hasError('pattern')) {
      this.errorPasswordMessage.set(
        loginConstants.ERRORMESSAGE.PASSWORDERROR.PATTERN
      );
    }
  }
}
