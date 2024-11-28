import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  static series: { title: string; image: string; description: string; vista: boolean }[] = [];
  segment: string = 'all';

  constructor(
    private route: ActivatedRoute, 
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    const newSerie = this.route.snapshot.queryParams;
    if (newSerie['title'] && newSerie['image'] && newSerie['description']) {
      this.series.push({
        title: newSerie['title'],
        image: newSerie['image'],
        description: newSerie['description'],
        vista: false  // Añadir vista como false por defecto
      });
    }
  }

  get series() {
    return Tab1Page.series;
  }

  filtrarSeries() {
    if (this.segment === 'vistas') {
      return this.series.filter(serie => serie.vista);
    } else if (this.segment === 'no-vistas') {
      return this.series.filter(serie => !serie.vista);
    } else {
      return this.series;
    }
  }

  async eliminarSerie(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta serie?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.series.splice(index, 1);
          },
        },
      ],
    });

    await alert.present();
  }

  async editarSerie(index: number) {
    const serie = this.series[index];
    const alert = await this.alertController.create({
      header: 'Editar Serie',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título',
          value: serie.title,
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'URL de la imagen',
          value: serie.image,
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción',
          value: serie.description,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.series[index] = {
              ...serie,
              title: data.title,
              image: data.image,
              description: data.description,
            };
          },
        },
      ],
    });

    await alert.present();
  }
}