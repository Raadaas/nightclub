import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

// === ENUMS ===

/**
 * Reservation status enum
 * Corresponds to: ReservationStatus.cs
 */
export enum ReservationStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2
}

// === QUERIES (READ) ===

/**
 * Query parameters for GET /Reservations
 * Corresponds to: ListReservationsQuery.cs
 */
export class ListReservationsRequest extends BasePagedQuery {
  eventId?: number | null;
  status?: ReservationStatus | null;
}

/**
 * Response item for GET /Reservations
 * Corresponds to: ListReservationsQueryDto.cs
 */
export interface ListReservationsQueryDto {
  id: number;
  eventId: number;
  eventTitle: string;
  clubTableId: number;
  clubTableName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  numberOfGuests: number;
  status: ReservationStatus;
  statusName: string;
  createdAtUtc: string;
  eventDate: string;
}

/**
 * Paged response for GET /Reservations
 */
export type ListReservationsResponse = PageResult<ListReservationsQueryDto>;

// === COMMANDS (WRITE) ===

export interface CreateReservationCommand {
  eventId: number;
  clubTableId: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string | null;
  numberOfGuests: number;
  note?: string | null;
}
