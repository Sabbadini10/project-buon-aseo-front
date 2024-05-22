import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../../../interfaces/Product';
import { ProductService } from '../../../../../services/products/product.service';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../../dashboardHeader/dashboardHeader.component';
import { ActivatedRoute } from '@angular/router';
import { ToFixedPipe } from '../../../../../core/pipes/toFixed/toFixed.pipe';

@Component({
  selector: 'app-editProduct',
  standalone: true,
  imports:[DashboardHeaderComponent, CommonModule, ToFixedPipe],
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {
  title: string = 'Detalle de producto'
  private productService = inject(ProductService);
  public productData = signal<Array<Product>>([])
  private activatedRoute = inject(ActivatedRoute)
  public idProduct = signal('')

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      this.idProduct.set(params['id']);
    });
  console.log(this.idProduct());
   }

  ngOnInit() {
    this.productService.getProductsId(this.idProduct()).subscribe(products => {
        const data = [products]
      this.productData.set(data) 
      console.log(this.productData())
    })
  }

}
