import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadApiService {
  private readonly baseUrl = `${environment.apiUrl}/Upload`;
  private http = inject(HttpClient);

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{ url: string }>(this.baseUrl, formData)
      .pipe(map(res => res.url));
  }
}
