import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { ClubTablesApiService } from '../../../api-services/club-tables/club-tables-api.service';
import { ReservationsApiService } from '../../../api-services/reservations/reservations-api.service';
import { GetEventByIdQueryDto } from '../../../api-services/events/events-api.models';
import { ListClubTablesQueryDto, ListClubTablesRequest } from '../../../api-services/club-tables/club-tables-api.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-event-detail',
  standalone: false,
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventsApi = inject(EventsApiService);
  private tablesApi = inject(ClubTablesApiService);
  private reservationsApi = inject(ReservationsApiService);
  private fb = inject(FormBuilder);

  event: GetEventByIdQueryDto | null = null;
  tables: ListClubTablesQueryDto[] = [];
  selectedTable: ListClubTablesQueryDto | null = null;

  isLoading = true;
  loadError = '';

  form!: FormGroup;
  isSubmitting = false;
  submitError = '';
  successId: number | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.form = this.fb.group({
      guestName:     ['', [Validators.required, Validators.maxLength(100)]],
      guestEmail:    ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      guestPhone:    ['', [Validators.required, Validators.maxLength(30)]],
      numberOfGuests:[1,  [Validators.required, Validators.min(1)]],
      note:          [''],
    });

    const tableReq = new ListClubTablesRequest();
    tableReq.onlyEnabled = true;
    tableReq.paging.pageSize = 200;

    forkJoin({
      event: this.eventsApi.getById(id),
      tables: this.tablesApi.list(tableReq),
    }).subscribe({
      next: ({ event, tables }) => {
        this.event = event;
        this.tables = tables.items;
        this.isLoading = false;
      },
      error: () => {
        this.loadError = 'Nije moguće učitati detalje događaja.';
        this.isLoading = false;
      },
    });
  }

  selectTable(table: ListClubTablesQueryDto): void {
    this.selectedTable = table;
    const guests = this.form.get('numberOfGuests')!;
    guests.setValidators([Validators.required, Validators.min(1), Validators.max(table.capacity)]);
    guests.updateValueAndValidity();
    if ((guests.value ?? 0) > table.capacity) {
      guests.setValue(table.capacity);
    }
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

  hasError(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.touched && c.invalid);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.selectedTable || this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitError = '';

    this.reservationsApi.create({
      eventId:        this.event!.id,
      clubTableId:    this.selectedTable.id,
      guestName:      this.form.value.guestName.trim(),
      guestEmail:     this.form.value.guestEmail.trim(),
      guestPhone:     this.form.value.guestPhone.trim(),
      numberOfGuests: this.form.value.numberOfGuests,
      note:           this.form.value.note?.trim() || null,
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
}
