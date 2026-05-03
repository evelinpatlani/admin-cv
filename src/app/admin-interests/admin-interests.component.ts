import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent implements OnInit {
  btntxt: string = 'Guardar';
  interestsList: string[] = [];
  newInterest: string = '';
  docId: string | null = null;

  constructor(public interestsService: InterestsService) {}

  ngOnInit() {
    this.interestsService.getInterests().subscribe((result) => {
      this.docId = result.id;
      this.interestsList = result.data;
    });
  }

  agregarInterest() {
    if (!this.newInterest.trim()) return;
    this.interestsList.push(this.newInterest.trim());
    this.newInterest = '';
  }

  eliminarInterest(index: number) {
    this.interestsList.splice(index, 1);
  }

    guardarInterests() {
    this.interestsService.saveInterests(this.docId, this.interestsList).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}