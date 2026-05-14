import { Component, OnInit, inject, computed } from '@angular/core';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';
import { ProfileApiService } from '../../../api-services/profile/profile-api.service';
import { GetProfileDto } from '../../../api-services/profile/profile-api.models';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { ListEventsQueryDto, ListEventsRequest } from '../../../api-services/events/events-api.models';

@Component({
  selector: 'app-client-home',
  standalone: false,
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
})
export class ClientHomeComponent implements OnInit {
  private profileApi = inject(ProfileApiService);
  private eventsApi  = inject(EventsApiService);

  profile: GetProfileDto | null = null;
  upcomingEvents: ListEventsQueryDto[] = [];

  ngOnInit(): void {
    this.profileApi.get().subscribe({ next: p => this.profile = p, error: () => {} });

    const req = new ListEventsRequest();
    req.onlyPublished = true;
    req.paging.pageSize = 3;
    this.eventsApi.list(req).subscribe({ next: res => this.upcomingEvents = res.items, error: () => {} });
  }

  getInitials(): string {
    if (!this.profile) return '?';
    const f = this.profile.firstname?.[0] ?? '';
    const l = this.profile.lastname?.[0] ?? '';
    return (f + l).toUpperCase() || '?';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
