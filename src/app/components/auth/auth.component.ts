import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports:[CommonModule, RouterModule],
  template: '',
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
