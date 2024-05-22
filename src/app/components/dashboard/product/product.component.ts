import { Component, inject, Input, OnInit } from '@angular/core';
import { GraficasComponent } from '../graficasProductos/graficas.component';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../dashboardHeader/dashboardHeader.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ToggleDashboardHeaderService } from '../../../shared/services/toggleDashboardHeader.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports:[
    GraficasComponent, 
    RouterModule,
    DashboardHeaderComponent,
    HttpClientModule
  ],
  providers:[AuthService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productoPanel: boolean = false;
  toggleButton: boolean = false;
  title: string = "Productos"
  subscription: Subscription;
  private toggleDashboardHeaderService = inject(ToggleDashboardHeaderService)
  constructor() { 
    this.subscription = this.toggleDashboardHeaderService.booleanValue$.subscribe(value => {
      this.productoPanel = value;
    });
  }

  ngOnInit() {
    
  }
  clickToggle(){
    this.toggleButton = !this.toggleButton
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
