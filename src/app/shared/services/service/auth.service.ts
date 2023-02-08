import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ErrorHandle } from '../interface/error-handle';
import { User } from '../interface/user';
import { ErrorMap } from '@firebase/util';

// import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData?: User;
  errorHandle: ErrorHandle = {};

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    // private jwt: JwtHelperService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // this.router.navigate([''])
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.afAuth.onAuthStateChanged(u => {
        if (!u) {
          res(false)
        }
        res(true)
      })
    })
  }
  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token')
  //   return !this.jwt.isTokenExpired(token)
  // }

  SignIn({ email, password }: { email: string, password: string }): Promise<void | ErrorHandle> {
    this.afAuth.signOut()
    return new Promise((res, rej) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user)
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.router.navigate([''])
            }
          })
        })
        .catch((error) => {

          rej({
            message: error.message,
            isOpen: true,
            statueCode: 500,
            success: false
          })
        })
    })
  }

  SignUp({ email, password }: { email: string, password: string }): Promise<User | ErrorHandle | undefined> {
    return new Promise((res, rej) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          // this.SendVeridicationMail()
          this.SetUserData(result.user)
          this.router.navigate([''])
        }).catch((error) => {
          rej({
            message: error.message,
            isOpen: true,
            statueCode: 500,
            success: false
          })
        })
    })
  }

  SendVeridicationMail(): Promise<void> {
    return this.afAuth.currentUser.then((u: any) => {
      return u.sendEmailVerification()
    }).then(() => {
      this.router.navigate(['verification-email'])
    })
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    console.log(userData)
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {

    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    })
  }
}