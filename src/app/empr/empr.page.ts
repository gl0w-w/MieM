import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empr',
  templateUrl: './empr.page.html',
  styleUrls: ['./empr.page.scss'],
})
export class emprPage implements OnInit {
  emprendimiento = {
    nombre: '',
    tipo: '',
    direccion: '',
    creador: ''
  };

  constructor(
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.emprendimiento.creador = usuario.nombre || 'Usuario desconocido';
  }

  formularioValido(): boolean {
    return this.emprendimiento.nombre !== '' &&
           this.emprendimiento.tipo !== '' &&
           this.emprendimiento.direccion !== '';
  }

  async guardarEmprendimiento() {
    if (this.formularioValido()) {
      let emprendimientos = JSON.parse(localStorage.getItem('emprendimientos') || '[]');
      emprendimientos.push(this.emprendimiento);
      localStorage.setItem('emprendimientos', JSON.stringify(emprendimientos));
      
      await this.mostrarMensaje('Emprendimiento guardado con éxito');
      this.limpiarFormulario();
      
      this.router.navigate(['/inicio']);
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos');
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  limpiarFormulario() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.emprendimiento = {
      nombre: '',
      tipo: '',
      direccion: '',
      creador: usuario.nombre || 'Usuario desconocido'
    };
  }
}