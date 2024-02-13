import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  constructor(private http: HttpClient) { }

  getAuditorias(){
    const endPoint = `${base_url}/auditorias`;
    return this.http.get(endPoint);
  }

  postAuditorias(body: any){
    const endPoint = `${base_url}/auditorias`;
    return this.http.post(endPoint, body);
  }

  updateAuditorias(body: any, id: any){
    const endPoint = `${base_url}/auditorias/${id}`;
    return this.http.put(endPoint, body);
  }

//  deleteClientes(id: any){
  //  const endPoint = `${base_url}/proveedores/${id}`;
    //return this.http.delete(endPoint);
 // }

  getAuditoriasByIdUsuario(idUsuario: number){
    const endPoint = `${base_url}/auditorias/filter/${idUsuario}`;
    return this.http.get(endPoint);
  }

   getAuditoriaByName(usuario: any){
    const endPoint = `${base_url}/auditorias/filter1/${usuario}`;
    return this.http.get(endPoint);
  }

}
