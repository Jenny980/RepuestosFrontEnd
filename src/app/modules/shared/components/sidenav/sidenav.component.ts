import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpUserService } from '../../services/help-user.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  idUser: any;
  nombre: string = "";
  email: string = "";

  mobileQuery: MediaQueryList;
  menuNav =[
    {name: "Mi cuenta", route: "cuenta", icon: "face_retouching_natural"},
    {name: "Productos", route: "productos", icon: "inventory"},
    {name: "Proveedores", route: "proveedores", icon: "people_outline"},
    {name: "Ventas", route: "ventas", icon: "dashboard_customize"},
    {name: "Auditoria", route: "auditoria", icon: "list_alt"}
  ]

  constructor(private router: Router, media: MediaMatcher,
    private helpUserService: HelpUserService, private usuarioService: UsuarioService) 
    { this.mobileQuery = media.matchMedia('(max-width: 600px)');}

  ngOnInit(): void {
    this.helpUserService.idUsuario
      .subscribe((id: any) => this.idUser = id)
    this.getUsuario(this.idUser);
  }

  cerrar() {
    this.router.navigate(['/login']);
  }

  getUsuario(id: number){
    this.usuarioService.getUserById(id)
      .subscribe((resp: any) => {
        this.nombre = resp.usuarioResponse.usuario[0].nombre;
        this.email = resp.usuarioResponse.usuario[0].email;
      }, (error: any) => {
      console.log("error" , error);
    })
  }

}
