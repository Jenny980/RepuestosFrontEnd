import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpUserService {

  private id = new BehaviorSubject<string>('En espera de un id');
  public idUsuario = this.id.asObservable();
  
  constructor() { }

  public getIdUser(id: string): void {
    this.id.next(id);
  }
}
