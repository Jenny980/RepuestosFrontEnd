import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuotaService } from '../../shared/services/cuota.service';

@Component({
  selector: 'app-ver-cuotas',
  templateUrl: './ver-cuotas.component.html',
  styleUrls: ['./ver-cuotas.component.css']
})
export class VerCuotasComponent implements OnInit {

  displayedColumns: String[] = ['id', 'valor', 'fecha'];
  idPrestamo;
  cuotas = [];
  total = 0;

  constructor(private cuotaService: CuotaService,
    private dialogRef: MatDialogRef<VerCuotasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.idPrestamo = data.id;
     }

  ngOnInit(): void {
    this.getCuotas(this.idPrestamo);
  }

  getCuotas(id: number){
    this.cuotaService.getCuotaByPrestamo(id)
      .subscribe((resp: any) => {
        this.cuotasResponse(resp);
      }, (error: any) => {
      console.log("error" , error);
      this.cuotas=[]; 
    })
  }

  cuotasResponse(res: any){
    this.cuotas = res.cuotaResponse.cuotas;
    this.cuotas.forEach((element: any) => {
      this.total = this.total + element.valor;
    });
  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
