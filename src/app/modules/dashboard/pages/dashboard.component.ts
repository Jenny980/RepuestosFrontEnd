import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpUserService } from '../../shared/services/help-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  idUsuario: any;

  constructor(private activatedRoute: ActivatedRoute, private helpUserService: HelpUserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
        this.idUsuario = data['id'];
    });

    this.helpUserService.getIdUser(this.idUsuario);
  }
}
