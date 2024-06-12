import { Component, HostListener, inject, signal } from '@angular/core';
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
  /* products: Product[] = []; */
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Productos';
  showYAxisLabel = true;
  yAxisLabel: string = 'Cantidad';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  public view: [number, number];
  private productService = inject(ProductService)
  public products = signal<Array<Product>>([])
  constructor(/* private productService: ProductService */) {
    this.productService.getProducts(1, 5).subscribe({
      next: (data) => {
        this.products.set(data.products);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    const width = 1000;
    const height = 400;
    this.view = [width, height];
    this.actualizarDimensionesGrafico();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.actualizarDimensionesGrafico();
  }

  private actualizarDimensionesGrafico() {
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    // Ajusta estas constantes según tus necesidades
    const anchoMaximoGrafico = 1000;
    const altoMaximoGrafico = 400;

    const anchoGrafico = anchoVentana > anchoMaximoGrafico ? anchoMaximoGrafico : anchoVentana * 0.8;
    const altoGrafico = altoVentana > altoMaximoGrafico ? altoMaximoGrafico : altoVentana * 0.6;

    this.view = [anchoGrafico, altoGrafico];
  }

  onSelect(event: any) {
    console.log(event);
  }
}
