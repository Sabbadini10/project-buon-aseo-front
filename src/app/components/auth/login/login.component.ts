import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ErrorInterceptor } from '../../../core/interceptor/error.interceptor';
import { JwtInterceptor } from '../../../core/interceptor/jwt.interceptor';
import { fakeBackendProvider } from '../../../core/interceptor/fake.backend.interceptor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    AuthService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  togglepassword = signal('password');
  passwordBoolean = signal(false);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public isLoading = false;
  public submittedError = signal(false);
  public submittedExito = signal(false);
  messageError = signal('');
  public submittedLogin = false;
  public fieldTextType?: boolean = false;
  currentUser = signal('');
  private activatedRoute =  inject(ActivatedRoute)
  constructor() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  clickTogglePassword() {
    this.passwordBoolean.update((value) => (value = !value));
    if (!this.passwordBoolean()) {
      this.togglepassword.set('password');
    } else {
      this.togglepassword.set('text');
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (
      this.loginForm.controls['email'].value === '' ||
      this.loginForm.controls['password'].value === ''
    ) {
      this.submittedLogin = true;
    }
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.isLoading = true;
    this.submittedLogin = false;
    this.authService.login(user.email, user.password).subscribe({
      next: (res: any) => {
        if (res) {
          const user = this.authService.currentUserValue;
          if (user.role === 'user') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.messageError.set('Inicio de sesión inválido');
        }
      },
      error: (error) => {
        this.submittedError.set(true)
        this.isLoading = false;
        this.submittedLogin = false;
        this.isLoading = false;
      },
    });
  }
}
