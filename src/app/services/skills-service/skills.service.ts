import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/skills';
  skillsRef: AngularFirestoreCollection<skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<skills> {
    return this.skillsRef;
  }

  createSkill(mySkill: skills): any {
    return this.skillsRef.add({ ...mySkill });
  }

  deleteSkill(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}