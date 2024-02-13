import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  } 

  irRegistro() {
    this.router.navigate(['/registro']);
  }

  login(){
    if (this.loginForm.valid) {
      this.usuarioService.getUsuarioByEmailAndPass(this.loginForm.value.email)
        .subscribe((resp: any) => {
          if(resp.usuarioResponse.usuario[0].contrasena === this.loginForm.value.password){
            this.router.navigate(['/dashboard/' + resp.usuarioResponse.usuario[0].id + '/inicio']);
          }else {
            this.openSnackBar("Su email y/o contraseña son incorrectos", "Error");
            this.loginForm.get('password')?.setValue(null);
            this.loginForm.get('email')?.setValue(null);
          }
        }, (error: any) => {
        this.openSnackBar("Su email y/o contraseña son incorrectos", "Error");
        this.loginForm.get('email')?.setValue(null);
        this.loginForm.get('password')?.setValue(null);
    })
    } else {
      this.openSnackBar("El email y/o la contraseña son invalidos", "Error");
       this.loginForm.get('email')?.setValue(null);
       this.loginForm.get('password')?.setValue(null);
    }
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })
  }
}
