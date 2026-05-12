import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListMenuItemsRequest,
  ListMenuItemsResponse,
  CreateMenuItemCommand,
  UpdateMenuItemCommand
} from './menu-items-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsApiService {
  private readonly baseUrl = `${environment.apiUrl}/MenuItems`;
  private http = inject(HttpClient);

  /**
   * GET /MenuItems
   * List menu items with optional query parameters.
   */
  list(request?: ListMenuItemsRequest): Observable<ListMenuItemsResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;

    return this.http.get<ListMenuItemsResponse>(this.baseUrl, {
      params,
    });
  }

  /**
   * POST /MenuItems
   * Create a new menu item.
   * @returns ID of the newly created item
   */
  create(payload: CreateMenuItemCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  /**
   * PUT /MenuItems/{id}
   * Update an existing menu item.
   */
  update(id: number, payload: UpdateMenuItemCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /MenuItems/{id}
   * Delete a menu item.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
