import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent implements OnInit {
  btntxt: string = 'Guardar';
  languagesList: string[] = [];
  newLanguage: string = '';

  constructor(public languagesService: LanguagesService) {}

  ngOnInit() {
    this.languagesService.getLanguages().subscribe((data: string[]) => {
      this.languagesList = data;
    });
  }

  agregarLanguage() {
    if (!this.newLanguage.trim()) return;
    this.languagesList.push(this.newLanguage.trim());
    this.newLanguage = '';
  }

  eliminarLanguage(index: number) {
    this.languagesList.splice(index, 1);
  }

  guardarLanguages() {
    this.languagesService.saveLanguages(this.languagesList).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}