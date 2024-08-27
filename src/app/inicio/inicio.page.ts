import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})




export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombreUsuario = usuario.nombre || 'Desconocido'; 
  }
  constructor(private menuCtrl: MenuController) {}

  async closeMenu() {
    await this.menuCtrl.close();
  }
}
