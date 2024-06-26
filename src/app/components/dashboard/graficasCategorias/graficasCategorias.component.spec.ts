/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficasCategoriasComponent } from './graficasCategorias.component';
import { HttpClientModule } from '@angular/common/http';

describe('GraficasCategoriasComponent', () => {
  let component: GraficasCategoriasComponent;
  let fixture: ComponentFixture<GraficasCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GraficasCategoriasComponent, HttpClientModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
