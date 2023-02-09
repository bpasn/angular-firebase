import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public afs: AngularFirestore) {


  }

  getAllProduct() {
    return this.afs.collection('/Storage').snapshotChanges()
  }
}
