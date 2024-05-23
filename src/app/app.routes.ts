import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageComponent } from './components/home/page-not-found/page.component';
import { PasswordLostComponent } from './components/auth/password-lost/password-lost.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ListProductComponent } from './components/dashboard/product/crud/listProduct/listProduct.component';
import { AddProductComponent } from './components/dashboard/product/crud/addProduct/addProduct.component';
import { EditProductComponent } from './components/dashboard/product/crud/editProduct/editProduct.component';
import { DeleteProductComponent } from './components/dashboard/product/crud/deleteProduct/deleteProduct.component';

export const routes: Routes = [
  {
    path: 'auth',
    data: {
      status: 'authorized',
    },
    children: [
      {
        path: 'signin',
        canActivate: [AuthGuard],
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        title: 'Registro',
        component: RegisterComponent,
      },
      {
        path: 'password-lost',
        title: 'Recuperar Contraseña',
        component: PasswordLostComponent,
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'productAdmin',
        title: 'Product',
        component: ProductComponent,
      },
      {
        path: 'categoryAdmin',
        title: 'Category',
        component: CategoryComponent,
      },
      {
        path: 'usersAdmin',
        title: 'Users',
        component: UsersComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'productAdmin/list',
         title: 'Listado de Productos',
         component: ListProductComponent,
           },
           {
             path: 'productAdmin/add',
              title: 'Agregar Producto',
              component: AddProductComponent,
                },
                {
                 path: 'productAdmin/edit/:id',
                  title: 'Editar Producto',
                  component: AddProductComponent,
                    },
                    {
                     path: 'productAdmin/delete/:id',
                      title: 'Eliminar Producto',
                      component: DeleteProductComponent,
                        }
    ],
  },

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Pagina no encontrada',
    component: PageComponent,
  },
];
