import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      "nombre": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
      "confirmacionPassword": new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos requeridos.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      var usuario = {
        nombre: f.nombre,
        password: f.password
      }
      
      localStorage.setItem("usuario", JSON.stringify(usuario));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Registrado con éxito',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }]
      });

      await alert.present();
    }
  }
}