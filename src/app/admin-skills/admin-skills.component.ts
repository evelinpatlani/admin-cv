import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent implements OnInit {
  btntxt: string = 'Guardar';
  skillsList: { name: string, level: number }[] = [];
  newSkillName: string = '';
  newSkillLevel: number = 80;

  constructor(public skillsService: SkillsService) {}

  ngOnInit() {
    this.skillsService.getSkills().subscribe((data) => {
      this.skillsList = data;
    });
  }

  agregarSkill() {
    if (!this.newSkillName.trim()) return;
    this.skillsList.push({ name: this.newSkillName.trim(), level: this.newSkillLevel });
    this.newSkillName = '';
    this.newSkillLevel = 80;
  }

  eliminarSkill(index: number) {
    this.skillsList.splice(index, 1);
  }

  guardarSkills() {
    this.skillsService.saveSkills(this.skillsList).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}