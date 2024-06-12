import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../interfaces/Product';
import { ToFixedPipe } from '../../../core/pipes/toFixed/toFixed.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-ofert',
  standalone: true,
  imports: [CommonModule, RouterModule, ToFixedPipe],
  templateUrl: './product-ofert.component.html',
  styleUrls: ['./product-ofert.component.css']
})
export class ProductOfertComponent implements OnInit {
  private productService = inject(ProductService)
  public products = signal<Array<Product>>([])
  constructor() { }

  ngOnInit() {
    
    this.productService.getProducts(1, 16).subscribe({
      next: (data) => {
        const offeredProducts = data.products.filter((product: Product) => product.productOfert === true);
        this.products.set(offeredProducts);
        console.log(this.products())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
