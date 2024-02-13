import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { HelpUserService } from 'src/app/modules/shared/services/help-user.service';
import { NewClienteComponent } from '../new-cliente/new-cliente.component';
import { ProveedorService } from 'src/app/modules/shared/services/proveedor.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: String[] = ['id', 'nombre', 'direccion', 'ciudad', 'telefono', 'actions'];
  dataProveedores = new MatTableDataSource<ProveedorElement>();
  proveedores = [];
  idUser= 0;

  constructor(private helpUserService: HelpUserService,
    private proveedorService: ProveedorService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.helpUserService.idUsuario
      .subscribe((id: any) => this.idUser = id);
    this.getClientes();
  }        

  getClientes(){
    this.proveedorService.getProveedores()
    .subscribe( (data: any) => {
      this.proveedorResponse(data);
    }, (error: any) => {
      console.log("error" , error);
    })
  }

  proveedorResponse(resp: any){
    if(resp.metadata[0].Code === '00'){
      this.proveedores = resp.proveedoresResponse.proveedores;
    }
  }

  openProveedorDialog(){
    const dialogRef = this.dialog.open(NewClienteComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Porveedor registrado", "Exito");
        this.getClientes();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al registrar el proveedor", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, nombre: String, direccion: string, ciudad: string, telefono: number){
    const dialogRef = this.dialog.open(NewClienteComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, direccion: direccion, ciudad: ciudad, telefono: telefono,}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Proveedor actualizado", "Exito");
        this.getClientes();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar el Proveedor", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Cliente eliminado", "Exito");
        this.getClientes();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar el cliente", "Error");
      }
    });
  }


  buscar(nombre: any){
    if(nombre.length === 0){
      return this.getClientes();
    }
    this.proveedorService.getProveedorByName(nombre)
      .subscribe((resp: any) => {
        this.proveedorResponse(resp);
      }, (error: any) => {
         this.proveedores = [];
    }) 
  }
}

export interface ProveedorElement {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: number;
}
