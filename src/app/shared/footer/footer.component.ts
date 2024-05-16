import { Component, OnInit, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  panelCategory: boolean = false;
  panelProduct: boolean = false;
  panelSetting: boolean = false;
  headerHiddenAuth: boolean = false;
  currentRoute: string;
  currenteUser = signal('');
  public menuItems = routes
    .map((route) => route ?? [])
    .flat()
    .filter((route) => route && route.path == 'auth')
    .filter((route) => !route.path?.includes(':'));

  constructor(private router: Router) {
    this.currentRoute = 'Demo';
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

  ngOnInit() {}
}
