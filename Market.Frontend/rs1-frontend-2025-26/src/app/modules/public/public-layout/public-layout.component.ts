import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';

@Component({
  selector: 'app-public-layout',
  standalone: false,
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {
  currentYear = new Date().getFullYear().toString();
  menuOpen = false;

  currentUser = inject(CurrentUserService);
  private auth = inject(AuthFacadeService);
  private router = inject(Router);

  get isLoggedIn() { return this.currentUser.isAuthenticated(); }
  get isAdmin()    { return this.currentUser.isAdmin(); }
  get userEmail()  {
    const email = this.currentUser.snapshot?.email ?? '';
    return email.length > 20 ? email.slice(0, 18) + '…' : email;
  }

  logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/']));
    this.menuOpen = false;
  }
}
