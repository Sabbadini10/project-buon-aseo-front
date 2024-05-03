import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageComponent } from './components/page-not-found/page.component';
import { PasswordLostComponent } from './components/auth/password-lost/password-lost.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'signin',
                canActivate: [AuthGuard],
                title: 'Login',
                component: LoginComponent
            },
            {
                path: 'signup',
                title: 'Registro',
                component: RegisterComponent
            },
            {
                path: 'password-lost',
                title: 'Recuperar Contraseña',
                component: PasswordLostComponent
            },
            {
                path: '',
                redirectTo: 'signin',
                pathMatch: 'full'
            }
        ]
},
{
    path: 'home',
    title: 'Home',
    component: HomeComponent
},
{
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
},
{
    path: '**',
    title: 'Pagina no encontrada',
    component: PageComponent
}
];
