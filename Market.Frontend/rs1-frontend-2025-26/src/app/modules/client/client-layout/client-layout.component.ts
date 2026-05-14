import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { ProfileApiService } from '../../../api-services/profile/profile-api.service';

@Component({
  selector: 'app-client-layout',
  standalone: false,
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss',
})
export class ClientLayoutComponent {
  private auth   = inject(AuthFacadeService);
  private router = inject(Router);
  private profileApi = inject(ProfileApiService);

  currentUser = computed(() => this.auth.currentUser());
  menuOpen = false;

  profileName = '';

  constructor() {
    this.profileApi.get().subscribe({
      next: p => this.profileName = `${p.firstname} ${p.lastname}`.trim(),
      error: () => {}
    });
  }

  logout(): void {
    this.auth.logout().subscribe({ complete: () => this.router.navigate(['/auth/login']) });
  }
}
