/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficasComponent } from './graficas.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('GraficasComponent', () => {
  let component: GraficasComponent;
  let fixture: ComponentFixture<GraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GraficasComponent, HttpClientModule, RouterTestingModule.withRoutes([{ path: '', component: GraficasComponent}]) ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
