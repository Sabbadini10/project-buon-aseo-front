import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/products/product.service';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { ToFixedPipe } from '../../core/pipes/toFixed/toFixed.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailProduct',
  standalone: true,
  imports:[CommonModule, ToFixedPipe, RouterModule],
  templateUrl: './detailProduct.component.html',
  styleUrls: ['./detailProduct.component.css']
})
export class DetailProductComponent implements OnInit {
  private productService = inject(ProductService);
  public products = signal<Array<Product>>([]);
  private activatedRoute =  inject(ActivatedRoute);
  public id = signal('')
  constructor( ) {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id.set(id!);
    });
   }

  ngOnInit() {
    this.productService.getProductsId(this.id()).subscribe({
      next: (data) => {
         this.products.set([data]);
        console.log(this.products())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
