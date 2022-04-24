import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates if the two passwords match.
 *
 * @param control
 * @returns ValidationErrors | null
 */
export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password1 = control.get('password1')?.value;
  const password2 = control.get('password2')?.value;

  return password1 === password2 ? null : { passwordsMatch: true };
}
