import { User } from './../../shared/services/interface/user';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/service/auth.service';
import * as firebase from '@angular/fire/auth'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  title = 'angular-firebase';
  toggle: boolean = false;
  isLoading: boolean = false;
  userData: firebase.User | undefined;
  constructor(private auth: AuthService, private aft: AngularFireAuth) {
    this.aft.authState.subscribe((user: any) => {
      this.userData = user
    })
    console.log(this.userData)
  }
  SignOut() {
    this.auth.SignOut()
  }
  toggleHandle() {
    console.log(this.toggle = !this.toggle)
  }
}
