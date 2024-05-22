/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { GraficasUsuariosComponent } from './graficasUsuarios.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../../services/users/users.service';
import { of } from 'rxjs';
import { User, UserType } from '../../../interfaces/User';

describe('GraficasUsuariosComponent', () => {
  let component: GraficasUsuariosComponent;
  let fixture: ComponentFixture<GraficasUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GraficasUsuariosComponent, HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
