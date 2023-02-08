import { UserModel } from './../../models/user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorHandle } from 'src/app/shared/services/interface/error-handle';
import { AuthService } from 'src/app/shared/services/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isOpen: boolean = false;
  errorHandle: ErrorHandle = {};
  isLoading: boolean = false;
  form: FormGroup;
  constructor(public auth: AuthService, public fb: FormBuilder) {
    this.form = this.fb.group<UserModel>({
      uid: '',
      email: '',
      password: '',
      isAdmin: false,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  SubmitHandle() {

  }
}
