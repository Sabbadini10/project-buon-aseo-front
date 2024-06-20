/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartAddComponent } from './cartAdd.component';

describe('CartAddComponent', () => {
  let component: CartAddComponent;
  let fixture: ComponentFixture<CartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
