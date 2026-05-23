import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { BaseComponent } from '../../../core/components/base-classes/base-component';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { LoginCommand } from '../../../api-services/auth/auth-api.model';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-6px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent extends BaseComponent {
  private fb          = inject(FormBuilder);
  private auth        = inject(AuthFacadeService);
  private router      = inject(Router);
  private route       = inject(ActivatedRoute);
  private currentUser = inject(CurrentUserService);
  hidePassword = true;

  form = this.fb.group({
    email: ['admin@market.local', [Validators.required, Validators.email]],
    password: ['Admin123!', [Validators.required]],
    rememberMe: [false],
  });

  onSubmit(): void {
    if (this.form.invalid || this.isLoading) return;

    this.startLoading();

    const payload: LoginCommand = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      fingerprint: null,
    };

    this.auth.login(payload).subscribe({
      next: () => {
        this.stopLoading();
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const target = returnUrl ?? this.currentUser.getDefaultRoute();
        this.router.navigateByUrl(target);
      },
      error: (err) => {
        this.stopLoading('Invalid credentials. Please try again.');
        console.error('Login error:', err);
      },
    });
  }
}
