import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });
  loading: boolean = false;
  completed: boolean = false;

  constructor(private auth: AuthService) {}

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;
    this.auth
      .sendResetPassword(this.form.value.email)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => (this.completed = true),
      });
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.form.get(field);
    return (
      formControl &&
      formControl.errors &&
      formControl.touched &&
      formControl.errors[error]
    );
  }
}
