import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  btntxt: string = 'Agregar';
  languagesList: any[] = [];
  myLanguage: languages = new languages();

  constructor(public languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as languages })))
    ).subscribe(data => {
      this.languagesList = data;
    });
  }

  agregarLanguage() {
    this.languagesService.createLanguage(this.myLanguage).then(() => {
      console.log('Idioma agregado con éxito');
      this.myLanguage = new languages();
    });
  }

  deleteLanguage(id?: string) {
    this.languagesService.deleteLanguage(id).then(() => {
      console.log('Idioma eliminado con éxito');
    });
  }
}