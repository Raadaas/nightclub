import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListEventsRequest,
  ListEventsResponse,
  GetEventByIdQueryDto,
  CreateEventCommand,
  UpdateEventCommand
} from './events-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  private readonly baseUrl = `${environment.apiUrl}/Events`;
  private http = inject(HttpClient);

  /**
   * GET /Events
   * List events with optional query parameters.
   */
  list(request?: ListEventsRequest): Observable<ListEventsResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;

    return this.http.get<ListEventsResponse>(this.baseUrl, {
      params,
    });
  }

  /**
   * GET /Events/{id}
   * Get a single event by ID.
   */
  getById(id: number): Observable<GetEventByIdQueryDto> {
    return this.http.get<GetEventByIdQueryDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * POST /Events
   * Create a new event.
   * @returns ID of the newly created event
   */
  create(payload: CreateEventCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  /**
   * PUT /Events/{id}
   * Update an existing event.
   */
  update(id: number, payload: UpdateEventCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /Events/{id}
   * Delete an event.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
