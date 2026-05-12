import { Component, inject, OnInit } from '@angular/core';
import {
  ListReservationsRequest,
  ListReservationsQueryDto,
  ReservationStatus
} from '../../../../api-services/reservations/reservations-api.models';
import { ReservationsApiService } from '../../../../api-services/reservations/reservations-api.service';
import { BaseListPagedComponent } from '../../../../core/components/base-classes/base-list-paged-component';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DialogHelperService } from '../../../shared/services/dialog-helper.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent
  extends BaseListPagedComponent<ListReservationsQueryDto, ListReservationsRequest>
  implements OnInit {

  private api = inject(ReservationsApiService);
  private toaster = inject(ToasterService);
  private dialogHelper = inject(DialogHelperService);

  // Expose enum to template
  ReservationStatus = ReservationStatus;

  displayedColumns: string[] = [
    'eventTitle',
    'clubTableName',
    'guest',
    'numberOfGuests',
    'status',
    'createdAtUtc',
    'actions'
  ];

  constructor() {
    super();
    this.request = new ListReservationsRequest();
    this.request.paging.pageSize = 5;
  }

  ngOnInit(): void {
    this.initList();
  }

  protected loadPagedData(): void {
    this.startLoading();

    this.api.list(this.request).subscribe({
      next: (response) => {
        this.handlePageResult(response);
        this.stopLoading();
      },
      error: (err) => {
        this.stopLoading('Failed to load reservations');
        console.error('Load reservations error:', err);
      }
    });
  }

  // === UI Actions ===

  onConfirm(reservation: ListReservationsQueryDto): void {
    this.dialogHelper.confirm(
      'Confirm Reservation',
      'Are you sure you want to confirm this reservation for {{ name }}?',
      { name: reservation.guestName }
    ).subscribe(result => {
      if (result && result.button) {
        this.performConfirm(reservation);
      }
    });
  }

  onCancel(reservation: ListReservationsQueryDto): void {
    this.dialogHelper.confirmDelete(reservation.guestName, 'RESERVATIONS.DIALOGS.CANCEL_MESSAGE').subscribe(result => {
      if (result && result.button) {
        this.performCancel(reservation);
      }
    });
  }

  private performConfirm(reservation: ListReservationsQueryDto): void {
    this.startLoading();

    this.api.confirm(reservation.id).subscribe({
      next: () => {
        this.toaster.success('Reservation confirmed');
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.toaster.error('Failed to confirm reservation');
        console.error('Confirm reservation error:', err);
      }
    });
  }

  private performCancel(reservation: ListReservationsQueryDto): void {
    this.startLoading();

    this.api.cancel(reservation.id).subscribe({
      next: () => {
        this.toaster.success('Reservation cancelled');
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.toaster.error('Failed to cancel reservation');
        console.error('Cancel reservation error:', err);
      }
    });
  }

  getStatusClass(status: ReservationStatus): string {
    switch (status) {
      case ReservationStatus.Pending:   return 'status-pending';
      case ReservationStatus.Confirmed: return 'status-confirmed';
      case ReservationStatus.Cancelled: return 'status-cancelled';
      default: return '';
    }
  }
}
