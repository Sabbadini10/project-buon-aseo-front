import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../interfaces/Product';
import { UserRegister } from '../../../interfaces/User';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, ButtonModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {

 productService = inject(ProductService);
    products = signal<Array<Product>>([]); 
    users= signal<Array<UserRegister>>([]);
  usersService = inject(UsersService);
  page: number = 1;
  limit: number = 6;
     responsiveOptions: any[] = []; 


  constructor() {}
  


  ngOnInit(): void {
    this.productService.getProducts(this.page,this.limit).subscribe({
        next: (data) => {
            console.log('Datos recibidos2:', data.products);
          this.products.set(data.products);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
      
      
       this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    }

  }



