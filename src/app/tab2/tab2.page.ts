import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  nuevaSerie = {
    title: '',
    description: '',
    image: '',
    vista: false  // Añadimos la propiedad 'vista' aquí también
  };

  constructor(private router: Router) {}

  guardarSerie() {
    if (this.nuevaSerie.title && this.nuevaSerie.description && this.nuevaSerie.image) {
      // Añadir la nueva serie a la lista de series en Tab1Page
      Tab1Page.series.push({ ...this.nuevaSerie });

      // Limpiar los campos después de guardar la serie
      this.nuevaSerie = { title: '', description: '', image: '', vista: false };

      // Navegar a la página Tab1
      this.router.navigate(['/tabs/tab1']);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}