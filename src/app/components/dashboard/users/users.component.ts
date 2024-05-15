import { Component, OnInit } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboardHeader/dashboardHeader.component';
import { GraficasUsuariosComponent } from '../graficasUsuarios/graficasUsuarios.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DashboardHeaderComponent, GraficasUsuariosComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string = "Usuarios"
  constructor() { }

  ngOnInit() {
  }

 
}
