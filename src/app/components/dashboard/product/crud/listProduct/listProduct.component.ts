import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardHeaderComponent } from '../../../dashboardHeader/dashboardHeader.component';
import { ProductService } from '../../../../../services/products/product.service';
import { Product } from '../../../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../../cards/cards.component';

@Component({
  selector: 'app-listProduct',
  standalone: true,
  imports:[DashboardHeaderComponent, CommonModule, CardsComponent],
  templateUrl: './listProduct.component.html',
  styleUrls: ['./listProduct.component.css']
})
export class ListProductComponent implements OnInit {
  title: string = 'Listado de Productos'
  private productService = inject(ProductService);
  public productData = signal<Array<Product>>([])
  
  constructor() { }

  ngOnInit() {
    this.productService.getProducts(1,5).subscribe(products => {
      this.productData.set(products.products)
      console.log(this.productData())
    })
  }

}
