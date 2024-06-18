import { Component, OnInit, inject, signal } from '@angular/core';
import { CarService } from '../../services/car/car.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  private carService = inject(CarService);
  private activatedRoute =  inject(ActivatedRoute);
  public id = signal('')
  public car = signal<Array<any>>([])
  constructor() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id.set(id!);
    });
  }

  ngOnInit() {
    this.carService.getCar("66294b01f65c3072bffcd23a").subscribe({
      next: (data) => {
         this.car.set(data);
        console.log(this.car())
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  }

