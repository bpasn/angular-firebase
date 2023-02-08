import { User } from './../../shared/services/interface/user';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  title = 'angular-firebase';
  toggle: boolean = false;
  isLoading: boolean = false;
  userData!: User;
  constructor(private auth: AuthService, private aft: AngularFireAuth) {
    this.aft.authState.subscribe(user => {
      console.log(user)
    })
  }
  SignOut() {
    this.auth.SignOut()
  }
  toggleHandle() {
    console.log(this.toggle = !this.toggle)
  }
}
