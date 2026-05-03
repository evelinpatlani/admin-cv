import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
  btntxt: string = 'Guardar';
  myHeader: Header = new Header();

  constructor(public headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.getHeader().subscribe((data: any) => {
      if (data) this.myHeader = data;
    });
  }

  guardarHeader() {
    this.headerService.saveHeader(this.myHeader).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}