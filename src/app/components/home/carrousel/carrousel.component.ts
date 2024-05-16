import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
   /*  providers: [ProductService] */
})
export class CarrouselComponent implements OnInit {

  products: Product[] | undefined;
  productos = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}]

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
     /*  this.productService.getProductsSmall().then((products: Product) => {
          this.products = products;
      }); */

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

  getSeverity(status: string) {
          let dato;
          switch (status) {
          case 'INSTOCK':
              return dato ='success';
          case 'LOWSTOCK':
              return dato = 'warning';
          case 'OUTOFSTOCK':
              return dato ='danger';
      }
      return dato
  }

}
