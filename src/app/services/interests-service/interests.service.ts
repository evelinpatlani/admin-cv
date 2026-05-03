import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(private db: AngularFirestore) {}

 getInterests() {
    return this.db.collection('interests').snapshotChanges().pipe(
      map((docs: any[]) => ({
        id: docs[0]?.payload.doc.id || null,
        data: docs[0]?.payload.doc.data()?.interests || []
      }))
    );
  }

  saveInterests(id: string | null, list: string[]): Promise<void> {
    const docId = id || 'main';
    return this.db.collection('interests').doc(docId).set({ interests: list }, { merge: true });
  }
}