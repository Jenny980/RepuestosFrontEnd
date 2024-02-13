import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { HelpUserService } from 'src/app/modules/shared/services/help-user.service';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuarioForm: FormGroup;
  idUser: any;
  usuario = [];
  editarP= false;
  
  constructor(private fb: FormBuilder, private helpUserService: HelpUserService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,) { 

      this.usuarioForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cc: ['', Validators.required],
      rol: ['', Validators.required],
      email: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

  ngOnInit(): void {
    this.helpUserService.idUsuario
      .subscribe((id: any) => this.idUser = id);
    this.getUsuario(this.idUser);
    

  }

  getUsuario(id: number){
    this.usuarioService.getUserById(id)
      .subscribe((resp: any) => {
   
        this.settear(resp.usuarioResponse.usuario[0]);
      }, (error: any) => {
      console.log("error" , error);
    })
  }

  settear(user: any){
    this.usuarioForm.get('id')?.setValue(user.id);
    this.usuarioForm.get('nombre')?.setValue(user.nombre);
    this.usuarioForm.get('apellido')?.setValue(user.apellido);
    this.usuarioForm.get('cc')?.setValue(user.cc);
    this.usuarioForm.get('rol')?.setValue(user.rol);
    this.usuarioForm.get('email')?.setValue(user.email);
    this.usuarioForm.get('contrasena')?.setValue(user.contrasena);
  }

  editar(){
    this.editarP = true;
  }

  eliminar(){
    //this.editarP = true;
  }

  cancelar(){
    this.editarP = false;
  }

  update(){
    console.log(this.usuarioForm.value);
    if(this.usuarioForm.invalid){
      this.openSnackBar("Datos invalidos", "Error")
    } else {
      this.usuarioService.updateUser(this.usuarioForm.value, this.idUser)
        .subscribe((data: any) =>{
          this.openSnackBar("Usuario actualizado", "Exito");
          this.editarP = false;
        }, (error: any) =>{
          this.openSnackBar("No se pudo actualizar el usuario", "Error")
        })
    }
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })
  }
}
