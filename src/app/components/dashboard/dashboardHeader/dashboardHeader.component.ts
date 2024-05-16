import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboardHeader',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboardHeader.component.html',
  styleUrls: ['./dashboardHeader.component.css'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() title: string = '';
  toggleButton: boolean = false;
  currenteUser = signal('');
  authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.currenteUser.set(this.authService.currentUserValue.name);
    console.log(this.currenteUser());
  }

  ngOnInit() {}

  clickToggle() {
    this.toggleButton = !this.toggleButton;
  }
  clickLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/signin');
  }
}
