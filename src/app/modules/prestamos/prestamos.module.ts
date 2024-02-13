import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamosComponent } from './components/prestamos/prestamos.component'; 
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPrestamoComponent } from './new-prestamo/new-prestamo.component';
import { NewCuotaComponent } from './new-cuota/new-cuota.component';
import { VerCuotasComponent } from './ver-cuotas/ver-cuotas.component';




@NgModule({
  declarations: [
    PrestamosComponent,
    NewPrestamoComponent,
    NewCuotaComponent,
    VerCuotasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrestamosModule { }
