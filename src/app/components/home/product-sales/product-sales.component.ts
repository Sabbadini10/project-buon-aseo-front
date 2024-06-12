import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToFixedPipe } from '../../../core/pipes/toFixed/toFixed.pipe';

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, ToFixedPipe],
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.css'],
})
export class ProductSalesComponent implements OnInit {
  private productService = inject(ProductService)
  public products = signal<Array<Product>>([])
  constructor() {}

  ngOnInit() {
    this.productService.getProducts(1, 16).subscribe({
      next: (data) => {
        const offeredProducts = data.products.filter((product: Product) => product.productUltimate === true);
        this.products.set(offeredProducts);
        console.log(this.products())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  }

