import { Component, OnInit, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthGuard, AuthService],
})
export class HeaderComponent implements OnInit {
  panelCategory: boolean = false;
  panelProduct: boolean = false;
  panelSetting: boolean = false;
  headerHiddenAuth: boolean = false;
  currentRoute: string;
  currenteUser = signal('');
  headerGuard: any;
  panelMobile: boolean = false;
  panelHeaderMobile: boolean = false;
  categoryMobile: boolean = false;
  productMobile: boolean = false;
  public menuItems = routes
    .map((route) => route ?? [])
    .flat()
    .filter((route) => route && route.path == 'auth')
    .filter((route) => !route.path?.includes(':'));

  constructor(private router: Router, private authService: AuthService) {
    this.currenteUser.set(this.authService.currentUserValue.name);

    this.currentRoute = 'Demo';
    this.router.config;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.headerHiddenAuth =
          this.currentRoute.includes('/dashboard') ||
          this.currentRoute.includes('/auth') ||
          (this.currentRoute.includes('/signin') &&
            this.currentRoute.includes('/signup') &&
            this.currentRoute.includes('/password-lost'));
      }
    });
  }

  isInAuthSection(route: any): boolean {
    if (route.path === 'auth') {
      return true;
    } else if (route.children) {
      for (const child of route.children) {
        if (child.path === 'auth') {
          return true;
        }
      }
    }
    return false;
  }

  ngOnInit() {}
  clickToggleCategory() {
    this.panelCategory = !this.panelCategory;
    this.panelProduct = false;
    this.panelSetting = false;
  }

  clickToggleProduct() {
    this.panelProduct = !this.panelProduct;
    this.panelCategory = false;
    this.panelSetting = false;
  }

  clickToggleSetting() {
    this.panelSetting = !this.panelSetting;
    this.panelCategory = false;
    this.panelProduct = false;
  }

  clickToggleMobile() {
    this.panelHeaderMobile = !this.panelHeaderMobile;
    console.log(this.panelHeaderMobile);
  }

  clickPanelCategoryMobile(){
    this.categoryMobile = !this.categoryMobile
    this.productMobile = false;
  }

  clickPanelProductMobile(){
    this.productMobile = !this.productMobile
    this.categoryMobile = false;
  }

  clickLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/signin');
    this.panelSetting = false;
  }
}
