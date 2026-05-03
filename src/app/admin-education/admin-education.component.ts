import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent implements OnInit {
  btntxt: string = 'Guardar';
  educationList: string[] = [];
  docId: string | null = null;
  newEducation: string = '';

  constructor(public educationService: EducationService) {}

  ngOnInit() {
    this.educationService.getEducation().subscribe((result) => {
      this.docId = result.id;
      this.educationList = result.data;
    });
  }

  agregarEducation() {
    if (!this.newEducation.trim()) return;
    this.educationList.push(this.newEducation.trim());
    this.newEducation = '';
  }

  eliminarEducation(index: number) {
    this.educationList.splice(index, 1);
  }

  guardarEducation() {
    this.educationService.saveEducation(this.docId, this.educationList).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}