import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToFixedPipe } from '../../../core/pipes/toFixed/toFixed.pipe';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule, ToFixedPipe],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
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
