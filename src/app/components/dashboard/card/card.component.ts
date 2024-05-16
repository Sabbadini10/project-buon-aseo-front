import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  usersService = inject(UsersService);
  limit = signal(5);
  page = signal(1);
  countProduct = signal(0);
  countCategory = signal(0);
  countUsers = signal(0);
  constructor() {
    this.productService.getProducts(this.page(), this.limit()).subscribe({
      next: (res) => {
        this.countProduct.set(res.total);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.countCategory.set(res.length);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.countUsers.set(res.length);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {}
}
