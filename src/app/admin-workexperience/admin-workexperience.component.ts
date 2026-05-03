import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  btntxt: string = 'Agregar';
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  newAccomplishment: string = '';

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(data => {
      this.workExperience = data;
    });
  }

  agregarAccomplishment() {
    if (!this.newAccomplishment.trim()) return;
    if (!this.myWorkExperience.accomplishments) this.myWorkExperience.accomplishments = [];
    this.myWorkExperience.accomplishments.push(this.newAccomplishment.trim());
    this.newAccomplishment = '';
  }

  eliminarAccomplishment(index: number) {
    this.myWorkExperience.accomplishments?.splice(index, 1);
  }

  agregarJob() {
    if (!this.myWorkExperience.accomplishments) this.myWorkExperience.accomplishments = [];
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      this.myWorkExperience = new WorkExperience();
    });
  }

  deleteJob(id?: string) {
    this.workExperienceService.deleteWorkExperience(id);
  }
}