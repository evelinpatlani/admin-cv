import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private db: AngularFirestore) {}

  getSkills() {
    return this.db.collection('skills').valueChanges().pipe(
      map((docs: any[]) => docs[0]?.skills || [])
    );
  }

  saveSkills(skillsList: { name: string, level: number }[]): Promise<void> {
    return this.db.collection('skills').doc('main').set({ skills: skillsList }, { merge: true });
  }
}