import { Component, OnInit } from '@angular/core';
import { GraficasComponent } from '../graficasProductos/graficas.component';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../dashboardHeader/dashboardHeader.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports:[
    GraficasComponent, 
    RouterModule,
    DashboardHeaderComponent
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  toggleButton: boolean = false;
  title: string = "Productos"
  constructor() { }

  ngOnInit() {
  }
  clickToggle(){
    this.toggleButton = !this.toggleButton
  }
}
