import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<certificates>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates() {
    return this.certificatesRef.doc<certificates>('data').valueChanges();
  }

  saveCertificates(myCertificates: certificates): Promise<void> {
    return this.certificatesRef.doc('data').set({ ...myCertificates }, { merge: true });
  }

  deleteCertificates(id?: string): Promise<void> {
    return this.certificatesRef.doc(id).delete();
  }
}
