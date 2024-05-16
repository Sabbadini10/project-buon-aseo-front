import { Component } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Product } from '../../../interfaces/Product';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [NgxChartsModule, LoadingComponent],
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent {
  multi: any[] = [];
  view: any;
  products: Product[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Productos';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  constructor(private productService: ProductService) {
    this.productService.getProducts(1, 5).subscribe({
      next: (data) => {
        this.products = data.products;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    const width = 1000;
    const height = 400;
    this.view = [width, height];
  }

  onSelect(event: any) {
    console.log(event);
  }
}
