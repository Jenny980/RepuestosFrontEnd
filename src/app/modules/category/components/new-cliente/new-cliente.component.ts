import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/modules/shared/services/proveedor.service';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {

  public clienteForm: FormGroup;
  estadoFormulario: string ="";

  constructor(private fb: FormBuilder, private proveedorService: ProveedorService,
    private dialogRef: MatDialogRef<NewClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoFormulario = "Agregar";
    
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
   }

  ngOnInit(): void {
  }

  onSave(){
    let data = {
      nombre: this.clienteForm.get('nombre')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      ciudad: this.clienteForm.get('ciudad')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    }

    if(this.data != null){
      //update cliente
      this.proveedorService.updateProveedores(data, this.data.id)
        .subscribe((data: any) =>{
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2)
        })
    } else {
      //crear nuevo cliente
      this.proveedorService.postProveedores(data)
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
    this.clienteForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      direccion: [data.direccion, Validators.required],
      ciudad: [data.ciudad, Validators.required],
      telefono: [data.telefono, Validators.required]
    });
  }

}
