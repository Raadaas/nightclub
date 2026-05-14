import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private translate = inject(TranslateService);
  private breakpointObserver = inject(BreakpointObserver);
  auth = inject(AuthFacadeService);

  currentLang: string;
  isMobile = false;
  private bpSub!: Subscription;

  languages = [
    { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  constructor() {
    this.currentLang = this.translate.currentLang || 'bs';
  }

  ngOnInit(): void {
    this.bpSub = this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.bpSub?.unsubscribe();
  }

  closeIfMobile(): void {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  switchLanguage(langCode: string): void {
    this.currentLang = langCode;
    this.translate.use(langCode);
    localStorage.setItem('language', langCode);
  }

  getCurrentLanguage() {
    return this.languages.find(lang => lang.code === this.currentLang);
  }
}
