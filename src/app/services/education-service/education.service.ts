import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private db: AngularFirestore) {}

  getEducation() {
    return this.db.collection('education').snapshotChanges().pipe(
      map((docs: any[]) => ({
        id: docs[0]?.payload.doc.id || null,
        data: docs[0]?.payload.doc.data()?.education || []
      }))
    );
  }

  saveEducation(id: string | null, list: string[]): Promise<void> {
    const docId = id || 'main';
    return this.db.collection('education').doc(docId).set({ education: list }, { merge: true });
  }
}