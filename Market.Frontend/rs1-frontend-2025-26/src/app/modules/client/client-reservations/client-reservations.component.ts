import { Component, OnInit, inject } from '@angular/core';
import { ReservationsApiService } from '../../../api-services/reservations/reservations-api.service';
import { ListReservationsQueryDto, ListReservationsRequest, ReservationStatus } from '../../../api-services/reservations/reservations-api.models';

@Component({
  selector: 'app-client-reservations',
  standalone: false,
  templateUrl: './client-reservations.component.html',
  styleUrl: './client-reservations.component.scss',
})
export class ClientReservationsComponent implements OnInit {
  private api = inject(ReservationsApiService);

  reservations: ListReservationsQueryDto[] = [];
  isLoading = true;
  error = '';

  readonly ReservationStatus = ReservationStatus;

  ngOnInit(): void {
    const req = new ListReservationsRequest();
    req.paging.pageSize = 100;

    this.api.list(req).subscribe({
      next: res => {
        this.reservations = res.items;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Nije moguće učitati rezervacije.';
        this.isLoading = false;
      },
    });
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('bs-BA', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  formatCreated(d: string): string {
    return new Date(d).toLocaleDateString('bs-BA', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  statusClass(status: ReservationStatus): string {
    switch (status) {
      case ReservationStatus.Confirmed: return 'status-confirmed';
      case ReservationStatus.Cancelled: return 'status-cancelled';
      default: return 'status-pending';
    }
  }

  statusLabel(status: ReservationStatus): string {
    switch (status) {
      case ReservationStatus.Confirmed: return 'Potvrđena';
      case ReservationStatus.Cancelled: return 'Otkazana';
      default: return 'Na čekanju';
    }
  }
}
