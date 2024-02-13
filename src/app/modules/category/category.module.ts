import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClienteComponent } from './components/new-cliente/new-cliente.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { NewProductoComponent } from './components/new-producto/new-producto.component';
import { NewIngresoBodegaComponent } from './components/new-ingreso-bodega/new-ingreso-bodega.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { NewSalidaBodegaComponent } from './components/new-salida-bodega/new-salida-bodega.component';



@NgModule({
  declarations: [
    CategoryComponent,
    NewClienteComponent,
    ProductosComponent,
    VentasComponent,
    InventarioComponent,
    NewProductoComponent,
    NewIngresoBodegaComponent,
    AuditoriaComponent,
    NewSalidaBodegaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
