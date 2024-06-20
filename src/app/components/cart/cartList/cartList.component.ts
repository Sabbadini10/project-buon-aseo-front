import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cartList',
  templateUrl: './cartList.component.html',
  styleUrls: ['./cartList.component.css']
})
export class CartListComponent implements OnInit {
  private carService = inject(CartService);
  private activatedRoute =  inject(ActivatedRoute);
  public id = signal('')
  public cartList = signal<Array<any>>([])
  constructor() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id.set(id!);
    });
  }

  ngOnInit() {
    this.carService.getCart("66294b01f65c3072bffcd23a").subscribe({
      next: (data) => {
         this.cartList.set(data);
        console.log(this.cartList())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
