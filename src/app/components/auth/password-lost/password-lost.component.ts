import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-lost',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
