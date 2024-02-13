import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioByEmailAndPass(email: any){
    const endPoint = `${base_url}/usuarios/filter/${email}`;
    return this.http.get(endPoint);
  }

  postUsuarios(body: any){
    const endPoint = `${base_url}/usuarios`;
    return this.http.post(endPoint, body);
  }

  getUserById(id: any){
    const endPoint = `${base_url}/usuarios/${id}`;
    return this.http.get(endPoint);
  }

  updateUser(body: any, id: any){
    const endPoint = `${base_url}/usuarios/${id}`;
    return this.http.put(endPoint, body);
  } 
}
