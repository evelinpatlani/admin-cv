import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  educationRef: AngularFirestoreCollection<education>;

  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath);
  }

   getEducation() {
    return this.educationRef.doc<education>('data').valueChanges();
  }

  saveEducation(myEducation: education): Promise<void> {
    return this.educationRef.doc('data').set({ ...myEducation }, { merge: true });
  }

  deleteEducation(id?: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }
}
