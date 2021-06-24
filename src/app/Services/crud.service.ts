import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(public firestore: AngularFirestore) {}

  create_employee(Record) {
    return this.firestore.collection('Employee').add(Record);
  }

  get_Allemployee() {
    return this.firestore.collection('Employee').snapshotChanges();
  }

  updateEmployee(recordId, record) {
    this.firestore.doc('Employee/' + recordId).update(record);
  }

  deleteEmployee(recordId) {
    this.firestore.doc('Employee/' + recordId).delete();
  }
}
