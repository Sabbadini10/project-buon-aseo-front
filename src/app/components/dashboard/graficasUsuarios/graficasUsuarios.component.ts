import { Component, HostListener, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { User, UserType } from '../../../interfaces/User';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-graficasUsuarios',
  standalone: true,
  imports: [NgxChartsModule, LoadingComponent],
  templateUrl: './graficasUsuarios.component.html',
  styleUrls: ['./graficasUsuarios.component.css'],
})
export class GraficasUsuariosComponent implements OnInit {
  multi: any[] = [];
  view: [number, number];
  users: User[] = [];
  usersService = inject(UsersService);
  userTypes: UserType[] = [];
  result: any;
  cardColor: string = '#232837';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  constructor() {
    this.usersService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });

    this.usersService.getUserTypes().subscribe({
      next: (data: any) => {
        this.userTypes = data;
        setTimeout(() => {
          this.result = this.userTypes.map((value) => {
            const count = this.users.filter(
              (user) => user.id_type_user == value._id
            ).length;
            const nameRol =
              value.name == 'admin'
                ? 'Administrador'
                : value.name && value.name == 'user'
                ? 'Usuarios'
                : value.name;
            return { name: nameRol, value: count };
          });
        }, 2000);
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

  ngOnInit() {}
  onSelect(event: any) {
    console.log(event);
  }
}
