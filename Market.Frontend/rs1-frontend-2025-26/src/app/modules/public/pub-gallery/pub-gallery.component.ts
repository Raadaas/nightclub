import { Component, OnInit, inject } from '@angular/core';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { GalleryApiService } from '../../../api-services/gallery/gallery-api.service';
import { ListEventsQueryDto, ListEventsRequest } from '../../../api-services/events/events-api.models';
import { ListGalleryImagesQueryDto, ListGalleryImagesRequest } from '../../../api-services/gallery/gallery-api.models';

@Component({
  selector: 'app-pub-gallery',
  standalone: false,
  templateUrl: './pub-gallery.component.html',
  styleUrl: './pub-gallery.component.scss',
})
export class PubGalleryComponent implements OnInit {
  private eventsApi = inject(EventsApiService);
  private galleryApi = inject(GalleryApiService);

  view: 'events' | 'detail' = 'events';
  isLoading = true;

  // Events list
  events: ListEventsQueryDto[] = [];
  searchTerm = '';

  // Event detail
  selectedEvent: ListEventsQueryDto | null = null;
  images: ListGalleryImagesQueryDto[] = [];
  lightboxImage: string | null = null;

  get filteredEvents(): ListEventsQueryDto[] {
    if (!this.searchTerm.trim()) return this.events;
    const q = this.searchTerm.toLowerCase();
    return this.events.filter(
      e => e.title.toLowerCase().includes(q) || (e.mainArtist ?? '').toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {
    const req = new ListEventsRequest();
    req.onlyPublished = true;
    req.paging.pageSize = 1000;
    req.paging.page = 1;

    this.eventsApi.list(req).subscribe({
      next: res => {
        this.events = (res.items ?? []).filter(e => e.isEnabled);
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  openEvent(event: ListEventsQueryDto): void {
    this.selectedEvent = event;
    this.view = 'detail';
    this.isLoading = true;
    this.images = [];

    const req = new ListGalleryImagesRequest();
    req.eventId = event.id;
    req.onlyEnabled = true;
    req.paging.pageSize = 1000;
    req.paging.page = 1;

    this.galleryApi.list(req).subscribe({
      next: res => {
        this.images = (res.items ?? []).sort((a, b) => a.displayOrder - b.displayOrder);
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  goBack(): void {
    this.view = 'events';
    this.selectedEvent = null;
    this.images = [];
    this.lightboxImage = null;
  }

  openLightbox(url: string): void {
    this.lightboxImage = url;
  }

  closeLightbox(): void {
    this.lightboxImage = null;
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('bs-BA', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  }
}
