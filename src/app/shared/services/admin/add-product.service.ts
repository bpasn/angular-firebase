import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private asf: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      console.log(user)
    })
  }
}
