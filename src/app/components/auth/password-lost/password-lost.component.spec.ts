/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PasswordLostComponent } from './password-lost.component';
import {  RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PasswordLostComponent', () => {
  let component: PasswordLostComponent;
  let fixture: ComponentFixture<PasswordLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PasswordLostComponent, RouterModule, RouterTestingModule.withRoutes([{ path: '', component: PasswordLostComponent}]) ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
