import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { HelpUserService } from 'src/app/modules/shared/services/help-user.service';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';
import { NewProductoComponent } from '../new-producto/new-producto.component';
import { NewIngresoBodegaComponent } from '../new-ingreso-bodega/new-ingreso-bodega.component';
import { NewSalidaBodegaComponent } from '../new-salida-bodega/new-salida-bodega.component';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: String[] = ['id', 'nombre', 'descripcion', 'modelo', 'cantidadBodega', 'actions'];
  dataProveedores = new MatTableDataSource<ProveedorElement>();
  productos = [];
  idUser= 0;
  nombreUsuario ="";

  constructor(private helpUserService: HelpUserService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.helpUserService.idUsuario
      .subscribe((id: any) => this.idUser = id);
    this.getProductos();
    this.obtenerNombreUsusario();
  }        

  getProductos(){
    this.productoService.getProductos()
    .subscribe( (data: any) => {
      this.productosResponse(data);
    }, (error: any) => {
      console.log("error" , error);
    })
  }

  obtenerNombreUsusario(){
    this.usuarioService.getUserById(this.idUser)
    .subscribe( (data: any) => {
      this.nombreUsuario = data.usuarioResponse.usuario[0].nombre;
      console.log(this.nombreUsuario)
    }, (error: any) => {
      console.log("error" , error);
    })
    
  }

  productosResponse(resp: any){
    if(resp.metadata[0].Code === '00'){
      this.productos = resp.productoResponse.producto;
    }
  }

  openProductoDialog(){
    const dialogRef = this.dialog.open(NewProductoComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto registrado", "Exito");
        this.getProductos();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al registrar el Producto", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, nombre: String, descripcion: string, modelo: string, precio: number, cantidadBodega: number){
    const dialogRef = this.dialog.open(NewProductoComponent, {
      width: '450px',
      data: {idUser: this.idUser, nombreUsuario: this.nombreUsuario, id: id, nombre: nombre, descripcion: descripcion, modelo: modelo, precio: precio, cantidadBodega: cantidadBodega}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto actualizado", "Exito");
        this.getProductos();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar el Producto", "Error");
      }
    });
  }

  addInventario(id: number, nombre: String, descripcion: string, modelo: string, precio: number, cantidadBodega: number){
    const dialogRef = this.dialog.open(NewIngresoBodegaComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, descripcion: descripcion, modelo: modelo, precio: precio, cantidadBodega: cantidadBodega}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Ingreso actualizado", "Exito");
        this.getProductos();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al Ingresar a bodega", "Error");
      }
    });
  }

    RestaInventario(id: number, nombre: String, descripcion: string, modelo: string, precio: number, cantidadBodega: number){
    const dialogRef = this.dialog.open(NewSalidaBodegaComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, descripcion: descripcion, modelo: modelo, precio: precio, cantidadBodega: cantidadBodega}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Salida actualizada", "Exito");
        this.getProductos();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al restar en bodega", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto eliminado", "Exito");
        this.getProductos();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar el producto", "Error");
      }
    });
  }


  buscar(nombre: any){
    if(nombre.length === 0){
      return this.getProductos();
    }
    this.productoService.getProductosByName(nombre)
      .subscribe((resp: any) => {
        this.productosResponse(resp);
      }, (error: any) => {
         this.productos = [];
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
