import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListClubTablesRequest,
  ListClubTablesResponse,
  GetClubTableByIdQueryDto,
  CreateClubTableCommand,
  UpdateClubTableCommand
} from './club-tables-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class ClubTablesApiService {
  private readonly baseUrl = `${environment.apiUrl}/ClubTables`;
  private http = inject(HttpClient);

  /**
   * GET /ClubTables
   * List club tables with optional query parameters.
   */
  list(request?: ListClubTablesRequest): Observable<ListClubTablesResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;

    return this.http.get<ListClubTablesResponse>(this.baseUrl, {
      params,
    });
  }

  /**
   * GET /ClubTables/{id}
   * Get a single club table by ID.
   */
  getById(id: number): Observable<GetClubTableByIdQueryDto> {
    return this.http.get<GetClubTableByIdQueryDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * POST /ClubTables
   * Create a new club table.
   * @returns ID of the newly created club table
   */
  create(payload: CreateClubTableCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  /**
   * PUT /ClubTables/{id}
   * Update an existing club table.
   */
  update(id: number, payload: UpdateClubTableCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /ClubTables/{id}
   * Delete a club table.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
