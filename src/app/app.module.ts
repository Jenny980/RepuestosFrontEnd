import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeraVistaComponent } from './components/primera-vista/primera-vista.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReportesComponent } from './modules/dashboard/components/reportes/reportes.component';
import { PrestamosComponent } from './modules/prestamos/components/prestamos/prestamos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelpUserService } from './modules/shared/services/help-user.service';

@NgModule({
  declarations: [
    AppComponent,
    PrimeraVistaComponent,
    LoginComponent,
    RegistroComponent,
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HelpUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
