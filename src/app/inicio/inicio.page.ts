import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Emprendimiento {
  nombre: string;
  tipo: string;
  direccion: string;
  creador: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';
  emprendimientos: Emprendimiento[] = [];

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this.cargarEmprendimientos();
  }

  cargarUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombreUsuario = usuario.nombre || 'Desconocido';
  }

  cargarEmprendimientos() {
    const emprendimientosGuardados = localStorage.getItem('emprendimientos');
    if (emprendimientosGuardados) {
      this.emprendimientos = JSON.parse(emprendimientosGuardados);
    }
  }

  async closeMenu() {
    await this.menuCtrl.close();
  }

  async limpiarEmprendimientos() {
    localStorage.removeItem('emprendimientos');
    this.emprendimientos = [];
    await this.menuCtrl.close();
    this.mostrarMensaje('Emprendimientos eliminados');
  }

  cerrarSesion() {
    //localStorage.removeItem('usuario');
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}