import { Component, inject, OnInit } from '@angular/core';
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
  view: any;
  users: User[] = [];
  /* users: any[] = []; */
  usersService = inject(UsersService);
  userTypes: UserType[] = [];
  /*  userTypes: any[] = []; */
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
        console.log(this.users);
      },
      error: (error: any) => {
        console.log('Error:', error);
      },
    });

    this.usersService.getUserTypes().subscribe({
      next: (data: any) => {
        this.userTypes = data;
        setTimeout(() => {
          this.result = this.userTypes.map((value) => {
            console.log(value);
            const count = this.users.filter(
              (user) => user.id_type_user == value._id
            ).length;
            console.log(count);
            const nameRol =
              value.name == 'admin'
                ? 'Administrador'
                : value.name && value.name == 'user'
                ? 'Usuarios'
                : value.name;
            return { name: nameRol, value: count };
          });
          console.log(this.result);
        }, 2000);
      },
      error: (error: any) => {
        console.log('Error:', error);
      },
    });

    const width = 400;
    const height = 200;
    this.view = [width, height];
  }

  ngOnInit() {}
  onSelect(event: any) {
    console.log(event);
  }
}
