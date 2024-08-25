import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  loginError: string = '';

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      "nombre": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  getErrorMessage(field: string): string {
    const control = this.formularioLogin.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return `El ${field} es requerido`;
      }
    }
    return '';
  }

  ingresar() {
    if (this.formularioLogin.valid) {
      var f = this.formularioLogin.value;
      var usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

      if (usuario.nombre == f.nombre && usuario.password == f.password) {
        console.log("Ingresado");
        this.router.navigate(['/inicio']);
      } else {
        this.loginError = 'Usuario o contraseña incorrectos';
      }
    }
  }
}