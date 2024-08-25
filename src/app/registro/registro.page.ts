import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator,
      ]),
      confirmacionPassword: new FormControl('', Validators.required),
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/[A-Z]/.test(value)) {
      return { uppercase: true };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialChar: true };
    }
    return null;
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmacionPassword')?.value;
    return password === confirmPassword ? null : {'mismatch': true};
  }

  getErrorMessage(field: string): string {
    const control = this.formularioRegistro.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return `El ${field} es requerido`;
      }
      if (control.errors['minlength']) {
        return `El ${field} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `El ${field} no puede tener más de ${control.errors['maxlength'].requiredLength} caracteres`;
      }
      if (control.errors['uppercase']) {
        return "La contraseña debe contener al menos una mayúscula";
      }
      if (control.errors['specialChar']) {
        return "La contraseña debe contener al menos un carácter especial";
      }
    }
    return '';
  }

  guardar() {
    if (this.formularioRegistro.valid) {
      var f = this.formularioRegistro.value;
      var usuario = {
        nombre: f.nombre,
        password: f.password,
      };

      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/login']);
    }
  }
}