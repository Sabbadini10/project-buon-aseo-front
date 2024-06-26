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
  public limit = signal(16)
  public page = signal(1)
  constructor() { }

  ngOnInit() {
    
    this.productService.getProducts(this.page(), this.limit()).subscribe({
      next: (data) => {
    const offeredProducts = data.products.filter((product: Product) => product.productOfert === true);
    const firstFourOffered = offeredProducts.slice(0, 4);
    this.products.set(firstFourOffered);
        console.log(this.products())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
