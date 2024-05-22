import { Component, EventEmitter, inject, Input, OnInit, Output, output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToggleDashboardHeaderService } from '../../../shared/services/toggleDashboardHeader.service';

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
  panelMobile: boolean = false;
  private router = inject(Router);
  private toggleDashboardHeaderService = inject(ToggleDashboardHeaderService)
  constructor() {
    this.currenteUser.set(this.authService.currentUserValue.name);
  
  }
  ngOnInit() {
   
  }
  
 

  clickToggle() {
    this.toggleButton = !this.toggleButton;
  }
  clickLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/signin');
  }

  clickButtonMobile(){
    this.panelMobile = !this.panelMobile;
  }

  clickPanelProduct(){
    this.panelMobile = !this.panelMobile;
    this.toggleDashboardHeaderService.updateBooleanValue(this.panelMobile);
  }
}
