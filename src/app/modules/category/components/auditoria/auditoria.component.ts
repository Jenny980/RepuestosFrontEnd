import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { AuditoriaService } from 'src/app/modules/shared/services/auditoria.service';
import { HelpUserService } from 'src/app/modules/shared/services/help-user.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {


  displayedColumns: String[] = ['id', 'usuario', 'accion', 'idUsuario'];
  dataAuditorias = new MatTableDataSource<AuditoriaElement>();
  auditorias = [];
  idUser= 0;

  constructor(private helpUserService: HelpUserService,
    private auditoriaService: AuditoriaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.helpUserService.idUsuario
      .subscribe((id: any) => this.idUser = id);
    this.getAuditorias();
  }        

  getAuditorias(){
    this.auditoriaService.getAuditorias()
    .subscribe( (data: any) => {
      this.auditoriaResponse(data);
    }, (error: any) => {
      console.log("error" , error);
    })
  }
auditoriaResponse(resp: any){
    if(resp.metadata[0].Code === '00'){
      this.auditorias = resp.auditoriaResponse.auditoria;
    }
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }


  buscar(nombre: any){
    if(nombre.length === 0){
      return this.getAuditorias();
    }
    this.auditoriaService.getAuditoriaByName(nombre)
      .subscribe((resp: any) => {
        this.auditoriaResponse(resp);
      }, (error: any) => {
         this.auditorias = [];
    }) 
  }
}

export interface AuditoriaElement {
  id: number;
  accion: string;
  usuario: string;
  idUsuario: string;
}

