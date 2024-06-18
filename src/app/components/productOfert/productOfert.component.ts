import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/products/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToFixedPipe } from '../../core/pipes/toFixed/toFixed.pipe';

@Component({
  selector: 'app-productOfert',
  standalone: true,
  imports: [CommonModule, RouterModule, ToFixedPipe],
  templateUrl: './productOfert.component.html',
  styleUrls: ['./productOfert.component.css']
})
export class ProductOfertComponent implements OnInit {
  private productService = inject(ProductService);
  public products = signal<Array<Product>>([])
  public limit = signal(16)
  public page = signal(1)

  constructor() { }

  ngOnInit() {
    this.productService.getProducts(this.page(), this.limit()).subscribe({
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

