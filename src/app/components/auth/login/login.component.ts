import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { catchError, map, Subscription, tap } from 'rxjs';
import { HttpErrorInterceptor } from '../../../utils/http.interceptor';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, HttpClient, { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  togglepassword = signal('password');
  passwordBoolean = signal(false);
  private formBuilder = inject(FormBuilder)
  private authService= inject(AuthService);
  private router= inject(Router);
  public isLoading = false;
  public submittedError = signal(false);
  public submittedExito = signal(false);
  messageError = signal('');
  private subs: Array<Subscription> = [];
  public submittedLogin = false;
  public fieldTextType?: boolean = false;
  currentUser = signal('');
  constructor() { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  clickTogglePassword() {
    /* this.passwordBoolean = !this.passwordBoolean; */
    this.passwordBoolean.update(value => value = !value);
  if(! this.passwordBoolean()){
    this.togglepassword.set('password');
  } else {
    this.togglepassword.set('text');
  }
  }


  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.controls['email'].value === '' || this.loginForm.controls['password'].value === '') {
      this.submittedLogin = true;
    }
  
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      return;
    }
  
    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
  }
    console.log(user);
    this.isLoading = true;
    this.submittedLogin = false;
    this.authService.login(user).subscribe(
      {
        next: (res) => {
          if (res) {
          this.currentUser.set(localStorage.getItem('currentUser') || '') 
          setTimeout(() =>{
            localStorage.setItem(this.currentUser(), JSON.stringify(res))
          }, 5000)
          this.isLoading = false;
           console.log("usuario logueado" + this.currentUser())
            this.router.navigate(['/home']);
          } else {
            console.log('Correo o contraseña incorrectos');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.submittedLogin = false;
        },
      });
}


  private loginUser() {
    return {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
    }
  }

  
  private sendNotification(title: string = 'Hub de seguridad', message: string, type: string): void {

    if(message == 'Contraseña incorrecta.'){
        this.submittedError.set(true);
        this.messageError.set('Credenciales invalidas');
    } else {
      this.submittedError.set(true);
      this.messageError.set(message);
    }
   
    setTimeout(() => {
      this.submittedError.set(false);
    this.messageError.set('');
    }, 2500)
   
  }
}
