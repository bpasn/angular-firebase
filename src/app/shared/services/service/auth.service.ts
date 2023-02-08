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
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserModel } from 'src/app/models/user.model';

// import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData?: any;
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
    // this.afAuth.signOut()
    return new Promise((res, rej) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          // this.SetUserData(result.user)
          this.afs.collection('users').valueChanges({ idField: result.user?.uid }).subscribe((user: any) => {

            if (user[0].isAdmin) {
              this.router.navigate(['admin'])
            } else {
              this.router.navigate([''])
            }
          })

          // this.afAuth.authState.subscribe(user => {
          //   if (user) {
          //     this.router.navigate([''])
          //   }
          // })
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

  SignUp({ email, password, isAdmin }: { email: string, password: string, isAdmin: boolean }): Promise<User | ErrorHandle | undefined> {
    return new Promise((res, rej) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          // this.SendVeridicationMail()
          this.SetUserData(result.user, isAdmin)
          // this.router.navigate([])
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${result.user?.uid}`
          )
          console.log(userRef)
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
  SetUserData(user: any, isAdmin: boolean = false) {
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAdmin: isAdmin
    };
    this.userData = userData
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


  CreateCollection(user: UserModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afs.collection('users')
        .add(user)
        .then(() => resolve())
        .catch((error => reject(error)))
    })
  }
}
