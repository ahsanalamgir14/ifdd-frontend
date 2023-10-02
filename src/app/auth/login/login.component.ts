import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  loading: boolean = false;
  hasLoginError: boolean = false;
  hasError: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;
    this.hasError = false;
    this.hasLoginError = false;
    this.auth
      .authenticate(this.form.value.email, this.form.value.password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (token) => {
          this.auth.login(token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.hasLoginError = true;
          } else {
            this.hasError = true;
          }
        },
      });
  }
}
