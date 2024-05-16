import { Component, OnInit } from '@angular/core';
import { BrandsComponent } from './brands/brands.component';
import { PayMethodComponent } from './pay-method/pay-method.component';
import { ProductOfertComponent } from './product-ofert/product-ofert.component';
import { ProductSalesComponent } from './product-sales/product-sales.component';
import { BannerComponent } from './banner/banner.component';
import { FormsModule } from '@angular/forms';
import { CarrouselComponent } from './carrousel/carrousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BrandsComponent,
    PayMethodComponent,
    ProductOfertComponent,
    ProductSalesComponent,
    BannerComponent,
    CarrouselComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
