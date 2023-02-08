import { ErrorHandering } from 'src/app/models/error';
import { AuthService } from 'src/app/shared/services/service/auth.service';
import { ErrorHandle } from './../../shared/services/interface/error-handle';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isOpen: boolean = false;
  errorHandle: ErrorHandle = {};
  isLoadingSignIn: boolean = false;
  isLoadingSignUp: boolean = false;
  form: FormGroup;

  constructor(public auth: AuthService, public fb: FormBuilder) {
    this.form = this.fb.group({
      email: '',
      password: ''
    })
  }

  async SignInFirebase() {
    this.isLoadingSignIn = true
    try {
      await this.auth.SignIn(this.form.value)
      this.isLoadingSignIn = false
    } catch (error) {
      this.errorHandle = error as ErrorHandle
      this.isLoadingSignIn = false
    }
  }

  async SignUpFirebase() {
    this.isLoadingSignUp = true
    try {
      await this.auth.SignUp(this.form.value)
      this.isLoadingSignUp = false
    } catch (error) {
      this.errorHandle = error as ErrorHandle
      this.isLoadingSignUp = false
    }
  }
}
