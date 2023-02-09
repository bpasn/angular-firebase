import { ErrorHandle } from './../services/interface/error-handle';
import { ProductModel } from './../../models/product.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  uid: string = ''
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid
      }
    })
  }
  SaveData(user: ProductModel): Promise<void | ErrorHandle | undefined> {
    return new Promise((res, rej) => {
      try {
        if (!this.uid) {
          rej({
            message: 'Place login',
            isOpen: true,
            statueCode: 500,
            success: false
          })
        }
        user.id = this.afs.createId()
        user.create_product_by = this.uid
        // const Storage: AngularFirestoreDocument<any> = this.afs.doc(
        //   `/Storage`
        // )

        // res(Storage.set(user, {
        //   merge: false
        // }))
        this.afs.collection('/Storage').add(user)
        res()
      } catch (error) {
        if (error instanceof Error) {
          rej({
            message: error.message,
            isOpen: true,
            statueCode: 500,
            success: false
          })
        }
      }
    })

  }
}
