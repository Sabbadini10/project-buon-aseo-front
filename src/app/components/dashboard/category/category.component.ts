import { Component, OnInit } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboardHeader/dashboardHeader.component';
import { GraficasCategoriasComponent } from '../graficasCategorias/graficasCategorias.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [DashboardHeaderComponent, GraficasCategoriasComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  title: string = 'Categorias';
  constructor() {}

  ngOnInit() {}
}
