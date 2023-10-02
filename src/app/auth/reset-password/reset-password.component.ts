import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';
import { passwordsMatchValidator } from '../passwords-match.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  email: string | null = '';
  token: string | null = '';
  form?: FormGroup;
  loading: boolean = false;
  completed: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.email && this.token) {
      this.form = new FormGroup(
        {
          email: new FormControl<string>(
            { value: this.email, disabled: true },
            [Validators.required, Validators.email]
          ),
          token: new FormControl<string>(this.token, [Validators.required]),
          password1: new FormControl<string>('', Validators.required),
          password2: new FormControl<string>('', Validators.required),
        },
        { validators: passwordsMatchValidator }
      );
    }
  }

  onSubmit(): void {
    if (!this.form || !this.form.valid) {
      return;
    }

    this.loading = true;
    this.completed = false;
    this.errorMessage = '';

    const data = this.form.getRawValue();
    data.password = data.password1;
    data.password_confirmation = data.password2;

    delete data.password1;
    delete data.password2;

    this.auth
      .resetPassword(data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => (this.completed = true),
        error: (error) => (this.errorMessage = error?.error?.message),
      });
  }

  hasError(field: string, error: string, global: boolean = false): boolean {
    const formControl = this.form?.get(field);
    if (global) {
      return (
        formControl &&
        formControl.touched &&
        this.form?.errors &&
        this.form.errors[error]
      );
    }

    return (
      formControl &&
      formControl.errors &&
      formControl.touched &&
      formControl.errors[error]
    );
  }
}
