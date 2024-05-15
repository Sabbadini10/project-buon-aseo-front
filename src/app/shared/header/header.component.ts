import { Component, OnInit, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { routes } from '../../app.routes';
import { ActivatedRoute, Event, NavigationEnd, Router, UrlSerializer } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../core/guards/auth.guard';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ToolbarModule, AvatarModule, SharedModule, MenubarModule, CommonModule],
  providers: [AuthGuard]
})
export class HeaderComponent implements OnInit {
  panelCategory: boolean = false;
  panelProduct: boolean = false;
  panelSetting: boolean = false
  headerHiddenAuth: boolean = false;
  currentRoute: string;
  currenteUser = signal('')
  headerGuard: any;
  public menuItems = routes.map(route => route ?? [])
  .flat()
  .filter(route => route && route.path == 'auth')
  .filter(route => !route.path?.includes(':') );
 
  constructor(private router: Router, private authService: AuthService) { 
    this.currenteUser.set(this.authService.currentUserValue.name);

    
    this.currentRoute = "Demo";
    this.router.config
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.urlAfterRedirects;
           this.headerHiddenAuth = this.currentRoute.includes('/dashboard') || this.currentRoute.includes('/auth') || this.currentRoute.includes('/signin') && this.currentRoute.includes('/signup') && this.currentRoute.includes('/password-lost');
             /*  if(this.currentRoute.includes('/auth/signin')){
                this.headerHiddenAuth == true
              } else if (this.currentRoute.includes('/home')){
                this.headerHiddenAuth == false
              } */
        }

    });

  const isAuthSection = this.isInAuthSection(this.menuItems);
if (isAuthSection) {
  /*   console.log('false') */
} else {
   /*  console.log('true') */
}
  }
    
  isInAuthSection(route: any): boolean {
    // Verificar si la ruta actual es 'auth' o alguna de sus subrutas
    if (route.path === 'auth') {
        return true;
    } else if (route.children) {
        // Verificar si alguna de las subrutas es 'auth'
        for (const child of route.children) {
            if (child.path === 'auth') {
                return true;
            }
        }
    }
    // La ruta no está en 'auth' ni en sus hijos
    return false;
}


  ngOnInit() {
  }
  clickToggleCategory(){
    this.panelCategory = !this.panelCategory;
    this.panelProduct = false;
    this.panelSetting = false;
    console.log(this.panelCategory)
  }

  clickToggleProduct(){
    this.panelProduct = !this.panelProduct;
    this.panelCategory = false;
    this.panelSetting = false;
    console.log(this.panelProduct)
  }

  clickToggleSetting(){
    this.panelSetting = !this.panelSetting;
    this.panelCategory = false;
    this.panelProduct = false;
    console.log(this.panelSetting)
  }

  clickLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/signin')
    this.panelSetting = false;
  }
  
}
