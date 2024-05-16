import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  togglepassword = signal('password');
  passwordBoolean = signal(false);
  constructor() {}

  ngOnInit() {}

  clickTogglePassword() {
    /* this.passwordBoolean = !this.passwordBoolean; */
    this.passwordBoolean.update((value) => (value = !value));
    if (!this.passwordBoolean()) {
      this.togglepassword.set('password');
    } else {
      this.togglepassword.set('text');
    }
  }
}
