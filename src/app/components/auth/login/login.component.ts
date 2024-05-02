import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { catchError, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, HttpClient]
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
  error = signal('');
  private subs: Array<Subscription> = [];
  public submittedLogin = false;
  public fieldTextType?: boolean = false;
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
    this.isLoading = false;
      
    this.authService.login(user.email, user.password).subscribe({
      next: (res) => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/home']);
        } else {
          this.showError('Correo o contraseña incorrectos');
        }
      },
      error: (error) => {
        this.error = error;
        this.showError(error);
        this.isLoading = false;
        this.isLoading = false;
      },
    });
}

showError(message: string) {
  this.error.set(message);
  setTimeout(() => {
    this.error.set('');
  }, 5000);
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
