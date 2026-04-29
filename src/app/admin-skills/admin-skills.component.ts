import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  btntxt: string = 'Agregar';
  skillsList: skills[] = [];
  mySkill: skills = new skills();

  constructor(public skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as skills })))
    ).subscribe(data => {
      this.skillsList = data;
    });
  }

  agregarSkill() {
    this.skillsService.createSkill(this.mySkill).then(() => {
      console.log('Skill agregada con éxito');
      this.mySkill = new skills();
    });
  }

  deleteSkill(id?: string) {
    this.skillsService.deleteSkill(id).then(() => {
      console.log('Skill eliminada con éxito');
    });
  }
}