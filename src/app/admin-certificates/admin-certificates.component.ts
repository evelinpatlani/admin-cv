import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { certificates } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
  btntxt: string = 'Guardar';
  newItem: string = '';
  myCertificates: certificates = new certificates();

  constructor(public certificatesService: CertificatesService) {
    if (!this.myCertificates.certificates) this.myCertificates.certificates = [];
  }

  agregarItem() {
    if (!this.newItem.trim()) return;
    if (!this.myCertificates.certificates) this.myCertificates.certificates = [];
    this.myCertificates.certificates.push(this.newItem.trim());
    this.newItem = '';
  }

  eliminarItem(index: number) {
    this.myCertificates.certificates?.splice(index, 1);
  }

  guardarCertificates() {
    this.certificatesService.saveCertificates(this.myCertificates).then(() => {
      console.log('Certificados guardados con éxito');
    });
  }
}
