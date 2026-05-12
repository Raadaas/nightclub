import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsApiService } from '../../../../api-services/events/events-api.service';
import { ListEventsQueryDto, ListEventsRequest } from '../../../../api-services/events/events-api.models';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  private eventsApi = inject(EventsApiService);
  private router = inject(Router);

  events: ListEventsQueryDto[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';

  get filteredEvents(): ListEventsQueryDto[] {
    if (!this.searchTerm.trim()) return this.events;
    const q = this.searchTerm.toLowerCase();
    return this.events.filter(
      e => e.title.toLowerCase().includes(q) || (e.mainArtist ?? '').toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const req = new ListEventsRequest();
    req.paging.pageSize = 1000;

    this.eventsApi.list(req).subscribe({
      next: res => {
        this.events = res.items ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load events.';
        this.isLoading = false;
      },
    });
  }

  openEventGallery(event: ListEventsQueryDto): void {
    this.router.navigate(['/admin/gallery/event', event.id], {
      state: { event },
    });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('bs-BA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
