import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProfileApiService } from '../../../api-services/profile/profile-api.service';
import { GetProfileDto } from '../../../api-services/profile/profile-api.models';
import { ToasterService } from '../../../core/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-client-settings',
  standalone: false,
  templateUrl: './client-settings.component.html',
  styleUrl: './client-settings.component.scss',
})
export class ClientSettingsComponent implements OnInit {
  private api     = inject(ProfileApiService);
  private fb      = inject(FormBuilder);
  private toaster = inject(ToasterService);

  profile: GetProfileDto | null = null;
  isLoadingProfile = false;
  profileError = '';

  profileForm!: FormGroup;
  isSubmittingProfile = false;
  profileFormError = '';

  passwordForm!: FormGroup;
  isSubmittingPassword = false;
  passwordFormError = '';
  showCurrentPw = false;
  showNewPw     = false;
  showConfirmPw = false;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(100)]],
      lastname:  ['', [Validators.required, Validators.maxLength(100)]],
      email:     ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword:     ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    this.loadProfile();
  }

  private loadProfile(): void {
    this.isLoadingProfile = true;
    this.api.get().subscribe({
      next: p => {
        this.profile = p;
        this.profileForm.patchValue({ firstname: p.firstname, lastname: p.lastname, email: p.email });
        this.isLoadingProfile = false;
      },
      error: () => { this.profileError = 'Nije moguće učitati profil.'; this.isLoadingProfile = false; },
    });
  }

  getInitials(): string {
    if (!this.profile) return '?';
    return ((this.profile.firstname?.[0] ?? '') + (this.profile.lastname?.[0] ?? '')).toUpperCase() || '?';
  }

  hasError(form: FormGroup, field: string): boolean {
    const c = form.get(field);
    return !!(c && c.touched && c.invalid);
  }

  onSubmitProfile(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid || this.isSubmittingProfile) return;
    this.isSubmittingProfile = true;
    this.profileFormError = '';
    this.api.update({
      firstname: this.profileForm.value.firstname.trim(),
      lastname:  this.profileForm.value.lastname.trim(),
      email:     this.profileForm.value.email.trim(),
    }).subscribe({
      next: () => { this.isSubmittingProfile = false; this.toaster.success('Profil uspješno ažuriran'); this.loadProfile(); },
      error: (err: HttpErrorResponse) => { this.isSubmittingProfile = false; this.profileFormError = err?.error?.message ?? 'Greška.'; },
    });
  }

  onSubmitPassword(): void {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid || this.isSubmittingPassword) return;
    this.isSubmittingPassword = true;
    this.passwordFormError = '';
    this.api.changePassword({
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword:     this.passwordForm.value.newPassword,
    }).subscribe({
      next: () => { this.isSubmittingPassword = false; this.toaster.success('Lozinka uspješno promijenjena'); this.passwordForm.reset(); },
      error: (err: HttpErrorResponse) => { this.isSubmittingPassword = false; this.passwordFormError = err?.error?.message ?? 'Greška.'; },
    });
  }
}
