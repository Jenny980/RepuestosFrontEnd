import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PrestamoService } from 'src/app/modules/shared/services/prestamo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewPrestamoComponent } from '../../new-prestamo/new-prestamo.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { NewCuotaComponent } from '../../new-cuota/new-cuota.component';
import { VerCuotasComponent } from '../../ver-cuotas/ver-cuotas.component';
import { CuotaService } from 'src/app/modules/shared/services/cuota.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  displayedColumns: String[] = ['id', 'nombreCli', 'apellidoCli', 'credito', 'porcentaje', 'periodoPago', 'Npagos', 'valorCuota', 'debe', 'fecha', 'estado', 'actions'];
  idCliente: any;
  prestamos = [];

  constructor(private activatedRoute: ActivatedRoute,
    private cuotaService: CuotaService,
    private _location: Location,
    private prestamoService: PrestamoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
        this.idCliente = data['id'];
    });

    this.getPrestamos(this.idCliente);
  }

  irAtras(){
    this._location.back();
  }

  getPrestamos(id: number){
    this.prestamoService.getPrestamoByCliente(id)
      .subscribe((resp: any) => {
        this.prestamoResponse(resp);
      }, (error: any) => {
      console.log("error" , error);
      this.prestamos=[]; 
    })
  }

  prestamoResponse(resp: any){
      this.prestamos = resp.prestamoResponse.prestamos;
  }

  openPrestamoDialog(){
      const dialogRef = this.dialog.open(NewPrestamoComponent, {
      width: '450px',
      data: {clienteId: this.idCliente}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Prestamo registrado", "Exito");
        this.getPrestamos(this.idCliente);
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al registrar el prestamo", "Error");
      }
    });
  }

    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, credito: number, porcentaje: number, periodoPago: string, Npagos: number, valorCuota: number, debe: number, estado: String, clienteId: any){
    const dialogRef = this.dialog.open(NewPrestamoComponent, {
      width: '450px',
      data: {id: id, credito: credito, porcentaje: porcentaje, periodoPago: periodoPago, Npagos: Npagos, valorCuota: valorCuota, debe: debe, estado: estado, clienteId: clienteId}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Prestamo editado", "Exito");
        this.getPrestamos(this.idCliente);
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al editar el prestamo", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id: id, prestamo: true}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Prestamo eliminado", "Exito");
        this.getPrestamos(this.idCliente);
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar el prestamo", "Error");
      }
    });
  }

  openCuotaoDialog( valorCuota: number, idPrestamo: number, debe: number){
      const dialogRef = this.dialog.open(NewCuotaComponent, {
      width: '450px',
      data: {idPrestamo: idPrestamo, valorCuota: valorCuota, debe: debe}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Cuota registrada", "Exito");
        this.getPrestamos(this.idCliente);
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al registrar la cuota", "Error");
      }
    });
  }

  openVerCuota(id: number){
    this.cuotaService.getCuotaByPrestamo(id)
      .subscribe((resp: any) => {
        const dialogRef = this.dialog.open(VerCuotasComponent, {
          width: '450px',
          data: {id: id}
        });
        dialogRef.afterClosed().subscribe((result:any) => {
          if(result == 1){
            this.openSnackBar("Cuota registrada", "Exito");
            this.getPrestamos(this.idCliente);
          } else if(result == 2){
            this.openSnackBar("Se produjo un error al registrar la cuota", "Error");
          }
        });
      }, (error: any) => {
      console.log("error" , error);
      this.openSnackBar("No hay cuotas registradas", "Información");
    })
    
  }
}
