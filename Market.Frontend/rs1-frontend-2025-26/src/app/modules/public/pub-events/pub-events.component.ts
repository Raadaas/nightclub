import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { ListEventsQueryDto, ListEventsRequest } from '../../../api-services/events/events-api.models';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';

@Component({
  selector: 'app-pub-events',
  standalone: false,
  templateUrl: './pub-events.component.html',
  styleUrl: './pub-events.component.scss',
})
export class PubEventsComponent implements OnInit {
  private api         = inject(EventsApiService);
  private router      = inject(Router);
  private currentUser = inject(CurrentUserService);

  isLoading = true;
  search = '';
  activeTab: 'upcoming' | 'past' = 'upcoming';

  private allEvents: ListEventsQueryDto[] = [];
  upcoming: ListEventsQueryDto[] = [];
  past: ListEventsQueryDto[] = [];
  filtered: ListEventsQueryDto[] = [];

  ngOnInit(): void {
    const req = new ListEventsRequest();
    req.onlyPublished = true;
    req.paging.pageSize = 100;
    req.paging.page = 1;
    this.api.list(req).subscribe({
      next: res => {
        this.allEvents = res.items;
        this.splitAndFilter();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  setTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
    this.splitAndFilter();
  }

  onSearch(): void {
    this.splitAndFilter();
  }

  private splitAndFilter(): void {
    const now = new Date();
    const q = this.search.toLowerCase().trim();
    const src = q
      ? this.allEvents.filter(e =>
          e.title.toLowerCase().includes(q) ||
          (e.mainArtist ?? '').toLowerCase().includes(q))
      : this.allEvents;

    this.upcoming = src.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.past     = src.filter(e => new Date(e.date) <  now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.filtered = this.activeTab === 'upcoming' ? this.upcoming : this.past;
  }

  openEvent(id: number): void {
    if (this.currentUser.isAuthenticated()) {
      const base = this.router.url.startsWith('/client') ? '/client/events' : '/events';
      this.router.navigate([base, id]);
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: `/client/events/${id}` } });
    }
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('bs-BA', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  }

  formatTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });
  }
}
