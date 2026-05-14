import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListReservationsRequest,
  ListReservationsResponse,
  CreateReservationCommand,
} from './reservations-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class ReservationsApiService {
  private readonly baseUrl = `${environment.apiUrl}/Reservations`;
  private http = inject(HttpClient);

  /**
   * GET /Reservations
   * List reservations with optional query parameters.
   */
  list(request?: ListReservationsRequest): Observable<ListReservationsResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;

    return this.http.get<ListReservationsResponse>(this.baseUrl, {
      params,
    });
  }

  create(payload: CreateReservationCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  /**
   * PUT /Reservations/{id}/confirm
   * Confirm a reservation.
   */
  confirm(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/confirm`, {});
  }

  /**
   * PUT /Reservations/{id}/cancel
   * Cancel a reservation.
   */
  cancel(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
