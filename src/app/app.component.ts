import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClient, HttpHandler, withFetch, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { AuthService } from './services/auth/auth.service';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { fakeBackendProvider } from './core/interceptor/fake.backend.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    AuthComponent, 
    LoginComponent, 
    HttpClientModule, 
    HeaderComponent,
      FooterComponent
  ],
  providers: [
    {
      provide: HttpClient,
      useFactory: (handler: HttpHandler) => new HttpClient(handler),
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    AuthService,
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Buon Aseo';
}
