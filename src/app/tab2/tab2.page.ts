import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    vista: false  
  };

  constructor(private router: Router, private alertController: AlertController) {}

  async guardarSerie() {
    if (this.nuevaSerie.title && this.nuevaSerie.description && this.nuevaSerie.image) {
      Tab1Page.series.push({ ...this.nuevaSerie });

      this.nuevaSerie = { title: '', description: '', image: '', vista: false };

      this.router.navigate(['/tabs/tab1']);
    } else {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, complete todos los campos obligatorios.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}