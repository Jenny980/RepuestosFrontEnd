import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private snackBar: MatSnackBar, private router: Router) { 
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cc: ['', Validators.required],
      rol: ['', Validators.required],
      email: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  register(){
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      this.usuarioService.postUsuarios(this.loginForm.value)
        .subscribe((resp: any) => {
          this.openSnackBar("Usuario registrado", "Exito");
          this.router.navigate(['/login']);
        }, (error: any) => {
          console.log("error" , error);
          this.openSnackBar("No se puede crear este usuario", "Error")
        })
    } else {this.openSnackBar("Datos invalidos", "Error")}
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })
  }

}
