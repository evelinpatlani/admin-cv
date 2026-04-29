import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { education } from '../models/education/education.model';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  btntxt: string = 'Guardar';
  newItem: string = '';
  myEducation: education = new education();

  constructor(public educationService: EducationService) {
    if (!this.myEducation.education) this.myEducation.education = [];
  }

  agregarItem() {
    if (!this.newItem.trim()) return;
    if (!this.myEducation.education) this.myEducation.education = [];
    this.myEducation.education.push(this.newItem.trim());
    this.newItem = '';
  }

  eliminarItem(index: number) {
    this.myEducation.education?.splice(index, 1);
  }

  guardarEducation() {
    this.educationService.saveEducation(this.myEducation).then(() => {
      console.log('Educación guardada con éxito');
    });
  }
}
