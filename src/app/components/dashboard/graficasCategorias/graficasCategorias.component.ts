import { Component, inject, OnInit } from '@angular/core';
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
  view: any;
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

  constructor() {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        this.category = data;
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });

    const width = 700;
    const height = 400;
    this.view = [width, height];
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
