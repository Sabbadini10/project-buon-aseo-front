import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClient, HttpHandler, withFetch, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, LoginComponent, HttpClientModule],
  providers: [
    {
      provide: HttpClient,
      useFactory: (handler: HttpHandler) => new HttpClient(handler),
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor
    }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buonaseo';
}
