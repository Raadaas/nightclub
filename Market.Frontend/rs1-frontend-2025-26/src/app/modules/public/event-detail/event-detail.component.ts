import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { ClubTablesApiService } from '../../../api-services/club-tables/club-tables-api.service';
import { ReservationsApiService } from '../../../api-services/reservations/reservations-api.service';
import { ProfileApiService } from '../../../api-services/profile/profile-api.service';
import { GetEventByIdQueryDto } from '../../../api-services/events/events-api.models';
import { ListClubTablesQueryDto, ListClubTablesRequest } from '../../../api-services/club-tables/club-tables-api.models';
import { GetProfileDto } from '../../../api-services/profile/profile-api.models';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';

@Component({
  selector: 'app-event-detail',
  standalone: false,
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  private route           = inject(ActivatedRoute);
  private router          = inject(Router);
  private currentUser     = inject(CurrentUserService);
  private eventsApi       = inject(EventsApiService);
  private tablesApi       = inject(ClubTablesApiService);
  private reservationsApi = inject(ReservationsApiService);
  private profileApi      = inject(ProfileApiService);

  event: GetEventByIdQueryDto | null = null;
  tables: ListClubTablesQueryDto[] = [];
  selectedTable: ListClubTablesQueryDto | null = null;
  profile: GetProfileDto | null = null;

  isLoading = true;
  loadError = '';
  isSubmitting = false;
  submitError = '';
  successId: number | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    if (!this.currentUser.isAuthenticated()) {
      const returnUrl = this.router.url || `/client/events/${id}`;
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
      return;
    }

    const tableReq = new ListClubTablesRequest();
    tableReq.onlyEnabled = true;
    tableReq.paging.pageSize = 200;

    forkJoin({
      event:   this.eventsApi.getById(id),
      tables:  this.tablesApi.list(tableReq),
      profile: this.profileApi.get(),
    }).subscribe({
      next: ({ event, tables, profile }) => {
        this.event   = event;
        this.tables  = tables.items;
        this.profile = profile;
        this.isLoading = false;
      },
      error: () => {
        this.loadError = 'Nije moguće učitati detalje događaja.';
        this.isLoading = false;
      },
    });
  }

  getSection(name: string): ListClubTablesQueryDto[] {
    return this.tables.filter(t => t.section === name);
  }

  dotTooltip(t: ListClubTablesQueryDto): string {
    const parts = [t.name];
    if (t.isVip) parts.push('VIP');
    parts.push(`${t.capacity} osoba`);
    if (t.minSpend > 0) parts.push(`min. ${t.minSpend.toFixed(0)} KM`);
    return parts.join(' · ');
  }

  selectTable(table: ListClubTablesQueryDto): void {
    this.selectedTable = table;
    this.submitError = '';
  }

  confirmReservation(): void {
    if (!this.selectedTable || !this.event || !this.profile || this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitError = '';

    const guestName = `${this.profile.firstname} ${this.profile.lastname}`.trim()
      || this.profile.email;

    this.reservationsApi.create({
      eventId:        this.event.id,
      clubTableId:    this.selectedTable.id,
      guestName,
      guestEmail:     this.profile.email,
      numberOfGuests: 1,
      note:           null,
    }).subscribe({
      next: id => {
        this.successId = id;
        this.isSubmitting = false;
      },
      error: (err: HttpErrorResponse) => {
        this.submitError = err?.error?.message ?? 'Greška pri slanju rezervacije. Pokušajte ponovo.';
        this.isSubmitting = false;
      },
    });
  }

  formatPrice(p: number): string {
    return p.toFixed(2).replace('.', ',') + ' KM';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('bs-BA', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  formatTime(d: string): string {
    return new Date(d).toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });
  }
}
