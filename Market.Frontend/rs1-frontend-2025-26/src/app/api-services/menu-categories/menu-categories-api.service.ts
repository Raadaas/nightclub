import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListMenuCategoriesRequest,
  ListMenuCategoriesResponse,
  CreateMenuCategoryCommand,
  UpdateMenuCategoryCommand
} from './menu-categories-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesApiService {
  private readonly baseUrl = `${environment.apiUrl}/MenuCategories`;
  private http = inject(HttpClient);

  /**
   * GET /MenuCategories
   * List menu categories with optional query parameters.
   */
  list(request?: ListMenuCategoriesRequest): Observable<ListMenuCategoriesResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;

    return this.http.get<ListMenuCategoriesResponse>(this.baseUrl, {
      params,
    });
  }

  /**
   * POST /MenuCategories
   * Create a new menu category.
   * @returns ID of the newly created category
   */
  create(payload: CreateMenuCategoryCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  /**
   * PUT /MenuCategories/{id}
   * Update an existing menu category.
   */
  update(id: number, payload: UpdateMenuCategoryCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /MenuCategories/{id}
   * Delete a menu category.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
