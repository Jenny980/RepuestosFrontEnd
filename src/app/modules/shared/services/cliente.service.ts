import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(){
    const endPoint = `${base_url}/clientes`;
    return this.http.get(endPoint);
  }

  postClientes(body: any){
    const endPoint = `${base_url}/clientes`;
    return this.http.post(endPoint, body);
  }

  updateClientes(body: any, id: any){
    const endPoint = `${base_url}/clientes/${id}`;
    return this.http.put(endPoint, body);
  }

  deleteClientes(id: any){
    const endPoint = `${base_url}/clientes/${id}`;
    return this.http.delete(endPoint);
  }

  getClienteByName(nombre: any){
    const endPoint = `${base_url}/clientes/filter/${nombre}`;
    return this.http.get(endPoint);
  }

}
