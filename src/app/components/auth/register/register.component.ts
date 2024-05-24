import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserRegister } from '../../../interfaces/User';
import { UsersService } from '../../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule,FormsModule],
  providers: [ AuthService, HttpClient],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister: FormGroup;
  togglepassword = signal('password');
  passwordBoolean = signal(false);
  private fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private subs: Array<Subscription> = []; 
  public productId = signal('');
  public onEdit = signal(false);
  private activatedRoute = inject(ActivatedRoute);
  emailMatch: boolean = false;
  passwordMatch: boolean = false;
  usersList: Array<UserRegister> = [];
  private _userService = inject(UsersService);
  errorDiv: boolean = false;
  public isLoading = false;
  constructor() {
    this.formRegister = new FormGroup({})
    this._userService.getUsers().subscribe(users => {
      this.usersList = users
    })

  }


  ngOnInit() {
    this.subs.push(
      this.activatedRoute.paramMap.subscribe((data: any) => {
        this.productId.set(data.params.id);
        console.log(this.productId())
        if (this.productId()) {
          this.onEdit.set(true);
          this._userService.getUsersById(data.params.id)
            .subscribe(user => this.setValues(user));
            this.formRegister = this.fb.group({
              name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
              dni: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
              phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
              email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.validateEmail.bind(this)]],
              gender: ['', Validators.required],
              nationality: ['', Validators.required],
              birthday: ['', Validators.required],
              postal_code: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(6)]],
              address: ['', Validators.required],
              city: ['', Validators.required],
            /*   password: ['', [Validators.required, Validators.minLength(8)]], */
          });
        } else {
          this.onEdit.set(false);
          this.formRegister = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            phone: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.validateEmail.bind(this)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
            confirmedPassword: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(12), this.validatePasswords.bind(this)]],
        });
        }
      })
    );
  }

  clickTogglePassword() {
    this.passwordBoolean.update((value) => (value = !value));
    if (!this.passwordBoolean()) {
      this.togglepassword.set('password');
    } else {
      this.togglepassword.set('text');
    }
  }

  validatePasswords(){
    if (this.formRegister && this.formRegister.controls && this.formRegister.controls['password'] && this.formRegister.controls['confirmedPassword']) {
        const password: string = this.formRegister.controls['password'].value;
        const PasswordConfirm : string = this.formRegister.controls['confirmedPassword'].value;
        if (password !== PasswordConfirm) {
            this.passwordMatch = true;
        } else if (password === PasswordConfirm){
            this.passwordMatch = false;
        };
        console.log(this.passwordMatch)
      }
}

validateEmail() {
  if (Array.isArray(this.usersList) && this.formRegister && this.formRegister.controls && this.formRegister.controls['email']) {
     const email: string = this.formRegister.controls['email'].value;
     console.log(email);
     let emailMatch = false;
     for (let i = 0; i < this.usersList.length; i++) {
         const item = this.usersList[i];
         console.log(item)
         if (item.email === email) {
             emailMatch = true;
             break;
         }
     }
     this.emailMatch = emailMatch;
     console.log(emailMatch)
 }  
}

 private setValues(product: UserRegister): void {
  const values = this._userService.mapRequiredValues(product);
  const { controls } = this.formRegister;
  for (const value in values) {
    if (controls.hasOwnProperty(value)) {
      this.formRegister.controls[value].setValue(values[value]);
    }
  }
}


private buildUser() {
  return {
    name: this.formRegister.controls['name'].value,
    email: this.formRegister.controls['email'].value,
    password: this.formRegister.controls['password'].value,
    phone: this.formRegister.controls['phone'].value,
    id_type_user: 'user'
}
}

private buildUpdateUser() {
  return {
    name: this.formRegister.controls['name'].value,
    email: this.formRegister.controls['email'].value,
    nationality: this.formRegister.controls['nationality'].value,
    city: this.formRegister.controls['city'].value,
    address: this.formRegister.controls['address'].value,
    dni: this.formRegister.controls['dni'].value,
    postal_code: this.formRegister.controls['postal_code'].value,
    gender: this.formRegister.controls['gender'].value,
    phone: this.formRegister.controls['phone'].value,
    birthday: this.formRegister.controls['birthday'].value,
    id_type_user: 'user'
}
}

createUser() {
  const user = this.buildUser();
  console.log(user);
  if (!user) {
    console.error('User is undefined or null');
    return;
  }
  
  const observable = this._authService.createUser(user);
  if (!observable) {
    console.error('Observable is undefined');
    return;
  }
    this.subs.push(
      this._authService.createUser(user).subscribe({
        next: (data) => {
          console.log(data)
          if(data){
            console.log(data)
          }
        },
        error: (error) => {
          console.log(error.message)
          console.error('Error:', error);
        },
      })
    );
}

updateUser() {
  const user = this.buildUpdateUser();
  console.log(user);
    this.subs.push(
      this._userService.postUsersById(this.productId(), user).subscribe({
        next: (data) => {
          console.log(data)
          if(data){
           console.log(data)
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      })
    );
   
}

onSubmit() {
  console.log(this.formRegister)
  this.isLoading = true;
  if (this.formRegister.invalid) {
    return;
  }
  if (this.onEdit()) {
    this.updateUser();
  } else {
    this.createUser();
  }
}


  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
