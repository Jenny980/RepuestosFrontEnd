import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(){
    const endPoint = `${base_url}/productos`;
    return this.http.get(endPoint);
  }

  postProductos(body: any){
    const endPoint = `${base_url}/productos`;
    return this.http.post(endPoint, body);
  }

  updateProductos(body: any, id: any){
    const endPoint = `${base_url}/productos/${id}`;
    return this.http.put(endPoint, body);
  }

//  deleteClientes(id: any){
  //  const endPoint = `${base_url}/proveedores/${id}`;
    //return this.http.delete(endPoint);
 // }

  getProductosByName(nombre: any){
    const endPoint = `${base_url}/productos/filter/${nombre}`;
    return this.http.get(endPoint);
  }

}

