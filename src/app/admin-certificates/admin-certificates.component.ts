import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent implements OnInit {
  btntxt: string = 'Guardar';
  certificatesList: string[] = [];
  newCertificate: string = '';
  docId: string | null = null;

  constructor(public certificatesService: CertificatesService) {}

  ngOnInit() {
    this.certificatesService.getCertificates().subscribe((result) => {
      this.docId = result.id;
      this.certificatesList = result.data;
    });
  }

  agregarCertificate() {
    if (!this.newCertificate.trim()) return;
    this.certificatesList.push(this.newCertificate.trim());
    this.newCertificate = '';
  }

  eliminarCertificate(index: number) {
    this.certificatesList.splice(index, 1);
  }

  guardarCertificates() {
    this.certificatesService.saveCertificates(this.docId, this.certificatesList).then(() => {
      this.btntxt = '¡Guardado!';
      setTimeout(() => this.btntxt = 'Guardar', 2000);
    });
  }
}