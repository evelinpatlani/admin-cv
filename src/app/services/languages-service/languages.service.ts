import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/languages';
  languagesRef: AngularFirestoreCollection<languages>;

  constructor(public db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<languages> {
    return this.languagesRef;
  }

  createLanguage(myLanguage: languages): any {
    return this.languagesRef.add({ ...myLanguage });
  }

  deleteLanguage(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}