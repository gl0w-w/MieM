import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      "nombre": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (this.formularioLogin.valid) {
      if (usuario.nombre == f.nombre && usuario.password == f.password) {
        console.log("Ingresado");
        this.router.navigate(['/inicio']);
      } else {
        await this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
      }
    } else {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos requeridos.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}