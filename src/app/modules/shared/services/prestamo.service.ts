import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http: HttpClient) { }

  getPrestamos(){
    const endPoint = `${base_url}/prestamos`;
    return this.http.get(endPoint);
  }

  getPrestamoByCliente(id: number){
    const endPoint = `${base_url}/prestamos/client/ ${id}`;
    return this.http.get(endPoint);
  }

  savePrestamo(body: any){
    const endPoint = `${base_url}/prestamos`;
    return this.http.post(endPoint, body);
  }

  updatePrestamo(body: any, id: any){
    const endPoint = `${base_url}/prestamos/${id}`;
    return this.http.put(endPoint, body);
  }

  deletePrestamo(id: any){
    const endPoint = `${base_url}/prestamos/${id}`;
    return this.http.delete(endPoint);
  }

  getPrestamoById(id: number){
    const endPoint = `${base_url}/prestamos/ ${id}`;
    return this.http.get(endPoint);
  }

}
