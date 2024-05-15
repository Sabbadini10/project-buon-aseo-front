import { Component, inject, OnInit, signal } from '@angular/core';
import { GraficasComponent } from './graficasProductos/graficas.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AuthService } from '../../services/auth/auth.service';
import { DashboardHeaderComponent } from './dashboardHeader/dashboardHeader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GraficasComponent, 
    CardComponent, 
    RouterModule, 
    ProductComponent,
    DashboardHeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string = "Dashboard"

  constructor() { 
 
  }

  ngOnInit() {
  }


}
