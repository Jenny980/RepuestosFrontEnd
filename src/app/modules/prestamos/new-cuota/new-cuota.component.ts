import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { CuotaService } from '../../shared/services/cuota.service';
import { PrestamoService } from '../../shared/services/prestamo.service';

@Component({
  selector: 'app-new-cuota',
  templateUrl: './new-cuota.component.html',
  styleUrls: ['./new-cuota.component.css']
})
export class NewCuotaComponent implements OnInit {

  public cuotaForm: FormGroup;
  idCliente;
  periodo = null;
  valorCuotas = 0;
  cuotaMinima;
  idPrestamo;
  Maxcuota;
  cuotas = [];
  validacionRegistro = true;
  prestamo = [];
  data1 = {};

  constructor(private fb: FormBuilder,
    private cuotaService: CuotaService,
     private snackBar: MatSnackBar,
     private prestamoService: PrestamoService,
    private dialogRef: MatDialogRef<NewCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      this.idCliente = data.clienteId;
      this.cuotaMinima = data.valorCuota;
      this.idPrestamo = data.idPrestamo;
      this.Maxcuota = data.debe

      this.cuotaForm = this.fb.group({
        valor: ['', Validators.required],
        prestamoId: ['', Validators.required],
        cuotaSelect: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.cuotaForm.get("prestamoId")?.setValue(this.idPrestamo);
    this.cuotaForm.get("cuotaSelect")?.setValue("minima");
    this.cuotaForm.get("valor")?.setValue(this.cuotaMinima);
    this.getCuotas(this.idPrestamo);
    this.getPrestamo(this.idPrestamo);
  }
  getPrestamo(id: number){
    this.prestamoService.getPrestamoById(id)
      .subscribe((resp: any) => {
        this.prestamo = resp.prestamoResponse.prestamos;
      
      }, (error: any) => {
      console.log("error" , error);
    })
  }

  getCuotas(id: number){
    this.cuotaService.getCuotaByPrestamo(id)
      .subscribe((resp: any) => {
        this.cuotas = resp.cuotaResponse.cuotas;
        this.cuotas.forEach((element: any) => {
          this.valorCuotas = this.valorCuotas + element.valor
        });
      }, (error: any) => {
      console.log("error" , error);
      this.cuotas=[]; 
    })
  }


  onSave(){
    if(this.Maxcuota - this.cuotaForm.get('valor')?.value < 0){
      this.openSnackBar("La suma de las cuotas pasa el total a pagar del prestamo", "Error");
    } else{
      let data = {
      valor: this.cuotaForm.get('valor')?.value,
      prestamoId: this.idPrestamo
    }
    const formData = new FormData();
    formData.append('valor', data.valor);

    formData.append('prestamoId', data.prestamoId+"");

    this.cuotaService.saveCuota(formData)
      .subscribe((data: any) => {
        this.settearUpdate(this.prestamo);
        
       this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    });
    }  
  }

  settearUpdate(cuotas: any){
      if(this.Maxcuota - this.cuotaForm.get('valor')?.value <= 0){
        this.data1 = {
        credito: cuotas[0].credito,
        porcentaje: cuotas[0].porcentaje,
        periodoPago: cuotas[0].periodoPago,
        Npagos: cuotas[0].npagos-1,
        valorCuota: cuotas[0].valorCuota,
        debe: cuotas[0].debe-this.cuotaForm.get('valor')?.value,
        estado: 'Inactivo',
        clienteId: cuotas[0].cliente.id}
    } else {
      this.data1 = {
      credito: cuotas[0].credito,
      porcentaje: cuotas[0].porcentaje,
      periodoPago: cuotas[0].periodoPago,
      Npagos: cuotas[0].npagos-1,
      valorCuota: cuotas[0].valorCuota,
      debe: cuotas[0].debe-this.cuotaForm.get('valor')?.value,
      estado: cuotas[0].estado,
      clienteId: cuotas[0].cliente.id
    } 
    }
    this.update(this.data1);
  }

  update(data: any){
    const formData = new FormData();
    formData.append('credito', data.credito);
    formData.append('porcentaje', data.porcentaje);
    formData.append('periodoPago', data.periodoPago);
    formData.append('Npagos', data.Npagos);
    formData.append('valorCuota', data.valorCuota+"");
    formData.append('debe', data.debe);
    formData.append('estado', data.estado);
    formData.append('clienteId', data.clienteId+"");

      this.prestamoService.updatePrestamo(formData, this.idPrestamo)
        .subscribe((data: any) => {

        }, (error: any) => {
          console.log(error)
        });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  cuotaMin(){
    this.cuotaForm.get("valor")?.setValue(this.cuotaMinima);
  }

  cuotaOtro(){
    this.cuotaForm.get("valor")?.setValue(null);
  }

}
