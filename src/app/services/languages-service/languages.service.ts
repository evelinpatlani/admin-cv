import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(public db: AngularFirestore) {}

  getLanguages() {
    return this.db.collection('languages').valueChanges().pipe(
      map((docs: any[]) => docs[0]?.languages || [])
    );
  }

  saveLanguages(list: string[]): Promise<void> {
    return this.db.collection('languages').doc('main').set({ languages: list }, { merge: true });
  }
}