import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-lost',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent implements OnInit {
  private activatedRoute =  inject(ActivatedRoute)
  constructor() { }

  ngOnInit() {
  }

}
