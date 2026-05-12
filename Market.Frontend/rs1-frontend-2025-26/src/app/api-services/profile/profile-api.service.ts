import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  GetProfileDto,
  UpdateProfileCommand,
  ChangePasswordCommand,
} from './profile-api.models';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly baseUrl = `${environment.apiUrl}/Profile`;
  private http = inject(HttpClient);

  get(): Observable<GetProfileDto> {
    return this.http.get<GetProfileDto>(this.baseUrl);
  }

  update(payload: UpdateProfileCommand): Observable<void> {
    return this.http.put<void>(this.baseUrl, payload);
  }

  changePassword(payload: ChangePasswordCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/change-password`, payload);
  }
}
