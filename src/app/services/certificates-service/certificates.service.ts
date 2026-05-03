import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  constructor(private db: AngularFirestore) {}

 getCertificates() {
    return this.db.collection('certificates').snapshotChanges().pipe(
      map((docs: any[]) => ({
        id: docs[0]?.payload.doc.id || null,
        data: docs[0]?.payload.doc.data()?.certificates || []
      }))
    );
  }

  saveCertificates(id: string | null, list: string[]): Promise<void> {
    const docId = id || 'main';
    return this.db.collection('certificates').doc(docId).set({ certificates: list }, { merge: true });
  }
}