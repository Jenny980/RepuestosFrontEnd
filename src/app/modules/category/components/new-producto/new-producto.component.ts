import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuditoriaService } from 'src/app/modules/shared/services/auditoria.service';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

 public productoForm: FormGroup;
  estadoFormulario: string ="";
  idUser = 0;
  nombreUsuario = "";

  constructor(private fb: FormBuilder, private productoService: ProductoService, private auditoriaService: AuditoriaService,
    private dialogRef: MatDialogRef<NewProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoFormulario = "Agregar";
    
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      modelo: ['', Validators.required],
      precio: ['', Validators.required]
    });

    if(data != null){
      this.updateForm(data);
      this.idUser = data.idUser;
      this.nombreUsuario = data.nombreUsuario;
      this.estadoFormulario = "Actualizar";
    }
   }

  ngOnInit(): void {
  }

  onSave(){
    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      modelo: this.productoForm.get('modelo')?.value,
      precio: this.productoForm.get('precio')?.value,
      cantidadBodega: this.productoForm.get('cantidadBodega')?.value
    }

    

    if(this.data != null){
      //update cliente
      console.log(this.data.id)
      this.productoService.updateProductos(data, this.data.id)
        .subscribe((data: any) =>{
          this.dialogRef.close(1);
          let dataAuditoria = {
            usuario: this.nombreUsuario,
            accion: "Actualiza: " + this.productoForm.get('nombre')?.value,
            idUsuario: this.idUser
          }
          this.auditoriaService.postAuditorias(dataAuditoria)
          .subscribe((data: any) =>{
            }, (error: any) =>{
            })
        }, (error: any) =>{
          this.dialogRef.close(2)
        })

      
    } else {
      data.cantidadBodega = 0;
      //crear nuevo producto
      this.productoService.postProductos(data)
      .subscribe((data: any) => {
        this.dialogRef.close(1);
        
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.productoForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      modelo: [data.modelo, Validators.required],
      precio: [data.precio, Validators.required],
      cantidadBodega: [data.cantidadBodega, Validators.required]
    });
  }

}

