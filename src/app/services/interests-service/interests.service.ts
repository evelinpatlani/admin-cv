import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/interests';
  interestsRef: AngularFirestoreCollection<interests>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<interests> {
    return this.interestsRef;
  }

  createInterest(myInterest: interests): any {
    return this.interestsRef.add({ ...myInterest });
  }

  deleteInterest(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}