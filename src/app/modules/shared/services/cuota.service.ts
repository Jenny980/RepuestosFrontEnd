import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private http: HttpClient) { }

  saveCuota(body: any){
    const endPoint = `${base_url}/cuotas`;
    return this.http.post(endPoint, body);
  }

  getCuotaByPrestamo(id: number){
    const endPoint = `${base_url}/cuotas/prestamo/ ${id}`;
    return this.http.get(endPoint);
  }

    deleteCuota(id: any){
    const endPoint = `${base_url}/cuotas/${id}`;
    return this.http.delete(endPoint);
  }
}
