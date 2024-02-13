import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { CuotaService } from '../../services/cuota.service';
import { PrestamoService } from '../../services/prestamo.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  idCuotas= [];
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any, private clienteService: ClienteService, private cuotaService: CuotaService,
    private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    
  }


  getCuotas(id: number){
    this.cuotaService.getCuotaByPrestamo(id)
      .subscribe((resp: any) => {
        resp.cuotaResponse.cuotas.forEach((element: any) => {
          this.cuotaService.deleteCuota(element.id)
            .subscribe((data: any) => {
          }, (error: any) =>{
          })
        });
        this.prestamoService.deletePrestamo(this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2);
        })

      }, (error: any) => {
      console.log("error" , error);
      this.prestamoService.deletePrestamo(this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2);
        })

    })
  }

  

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data.prestamo == true){
      this.getCuotas(this.data.id);


      
    } else {
      if(this.data != null){
      this.clienteService.deleteClientes(this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2);
        })
    } else {
      this.dialogRef.close(2);
    }
    }
  }
}