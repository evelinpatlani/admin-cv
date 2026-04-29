import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  btntxt: string = 'Guardar';
  myHeader: Header = new Header();

  constructor(public headerService: HeaderService) {}

  guardarHeader() {
    this.headerService.saveHeader(this.myHeader).then(() => {
      console.log('Header guardado con éxito');
    });
  }
}
