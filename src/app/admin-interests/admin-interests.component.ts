import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  btntxt: string = 'Agregar';
  interestsList: interests[] = [];
  myInterest: interests = new interests();

  constructor(public interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as interests })))
    ).subscribe(data => {
      this.interestsList = data as any[];
    });
  }

  agregarInterest() {
    this.interestsService.createInterest(this.myInterest).then(() => {
      console.log('Interés agregado con éxito');
      this.myInterest = new interests();
    });
  }

  deleteInterest(id?: string) {
    this.interestsService.deleteInterest(id).then(() => {
      console.log('Interés eliminado con éxito');
    });
  }
}