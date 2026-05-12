import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ListGalleryImagesRequest,
  ListGalleryImagesResponse,
  CreateGalleryImageCommand,
  UpdateGalleryImageCommand,
} from './gallery-api.models';
import { buildHttpParams } from '../../core/models/build-http-params';

@Injectable({ providedIn: 'root' })
export class GalleryApiService {
  private readonly baseUrl = `${environment.apiUrl}/Gallery`;
  private http = inject(HttpClient);

  list(request?: ListGalleryImagesRequest): Observable<ListGalleryImagesResponse> {
    const params = request ? buildHttpParams(request as any) : undefined;
    return this.http.get<ListGalleryImagesResponse>(this.baseUrl, { params });
  }

  create(payload: CreateGalleryImageCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, payload);
  }

  update(id: number, payload: UpdateGalleryImageCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
