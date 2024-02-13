import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-new-ingreso-bodega',
  templateUrl: './new-ingreso-bodega.component.html',
  styleUrls: ['./new-ingreso-bodega.component.css']
})
export class NewIngresoBodegaComponent implements OnInit {

public productoForm: FormGroup;
public ingresoForm: FormGroup;
  estadoFormulario: string ="";
  cantidadAnterior: number = 0;

  constructor(private fb: FormBuilder, private productoService: ProductoService,
    private dialogRef: MatDialogRef<NewIngresoBodegaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoFormulario = "Agregar";
    
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      modelo: ['', Validators.required],
      precio: ['', Validators.required],
      cantidadBodega: ['', Validators.required]
    });

    this.ingresoForm = this.fb.group({
      cantidadBodega: ['', Validators.required]
    });

    if(data != null){
      this.updateForm(data);
      this.cantidadAnterior = data.cantidadBodega;
      this.estadoFormulario = "Actualizar";
    }
   }

  ngOnInit(): void {
  }

  onSave(){
    let cantidadNueva = this.ingresoForm.get('cantidadBodega')?.value + this.cantidadAnterior;
    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      modelo: this.productoForm.get('modelo')?.value,
      precio: this.productoForm.get('precio')?.value,
      cantidadBodega: cantidadNueva
    }

    if(this.data != null){
      //update cliente
      this.productoService.updateProductos(data, this.data.id)
        .subscribe((data: any) =>{
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2)
        })
    } else {
      //crear nuevo cliente
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


