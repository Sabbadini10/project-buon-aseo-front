import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { CategoryService } from '../../../services/category/category.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-graficasCategorias',
  standalone: true,
  imports: [NgxChartsModule, LoadingComponent],
  templateUrl: './graficasCategorias.component.html',
  styleUrls: ['./graficasCategorias.component.css'],
})
export class GraficasCategoriasComponent implements OnInit {
  categoryService = inject(CategoryService);
  multi: any[] = [];
  category = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Productos';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  cardColor: string = '#232837';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  public view: [number, number];
  constructor() {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        this.category = data;
      },
      error: (error: any) => {
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

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {}
}
