/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductOfertComponent } from './product-ofert.component';

describe('ProductOfertComponent', () => {
  let component: ProductOfertComponent;
  let fixture: ComponentFixture<ProductOfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ProductOfertComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
