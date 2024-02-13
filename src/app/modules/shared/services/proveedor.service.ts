import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  getProveedores(){
    const endPoint = `${base_url}/proveedores`;
    return this.http.get(endPoint);
  }

  postProveedores(body: any){
    const endPoint = `${base_url}/proveedores`;
    return this.http.post(endPoint, body);
  }

  updateProveedores(body: any, id: any){
    const endPoint = `${base_url}/proveedores/${id}`;
    return this.http.put(endPoint, body);
  }

//  deleteClientes(id: any){
  //  const endPoint = `${base_url}/proveedores/${id}`;
    //return this.http.delete(endPoint);
 // }

  getProveedorByName(nombre: any){
    const endPoint = `${base_url}/proveedores/filter/${nombre}`;
    return this.http.get(endPoint);
  }

}
