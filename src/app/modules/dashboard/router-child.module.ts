import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeraVistaComponent } from 'src/app/components/primera-vista/primera-vista.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { PrestamosComponent } from '../prestamos/components/prestamos/prestamos.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ProductosComponent } from '../category/components/productos/productos.component';
import { VentasComponent } from '../category/components/ventas/ventas.component';
import { AuditoriaComponent } from '../category/components/auditoria/auditoria.component';
//import { InventarioComponent } from '../category/components/inventario/inventario.component';


export const childRoutes: Routes = [
    { path: 'inicio/:id', component: PrimeraVistaComponent },
    { path: 'cuenta', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'proveedores', component: CategoryComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'auditoria', component: AuditoriaComponent },
    { path: 'prestamos/:id', component: PrestamosComponent },
    { path: '**', component: PrimeraVistaComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
