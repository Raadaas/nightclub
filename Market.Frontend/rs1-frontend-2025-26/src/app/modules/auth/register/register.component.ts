import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../api-services/auth/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb  = inject(FormBuilder);
  private api = inject(AuthApiService);
  private router = inject(Router);

  hidePw        = true;
  hideConfirmPw = true;
  isLoading     = false;
  errorMessage  = '';
  success       = false;

  form: FormGroup = this.fb.group({
    firstname:       ['', [Validators.required, Validators.maxLength(100)]],
    lastname:        ['', [Validators.required, Validators.maxLength(100)]],
    email:           ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    password:        ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  hasError(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.touched && c.invalid);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.api.register({
      firstname: this.form.value.firstname.trim(),
      lastname:  this.form.value.lastname.trim(),
      email:     this.form.value.email.trim(),
      password:  this.form.value.password,
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.success = true;
        setTimeout(() => this.router.navigate(['/auth/login']), 2500);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Greška pri registraciji. Pokušajte ponovo.';
      },
    });
  }
}
