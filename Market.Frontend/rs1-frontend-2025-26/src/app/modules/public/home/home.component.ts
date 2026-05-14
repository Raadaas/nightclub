import { Component, OnInit, inject } from '@angular/core';
import { EventsApiService } from '../../../api-services/events/events-api.service';
import { ListEventsQueryDto, ListEventsRequest } from '../../../api-services/events/events-api.models';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private eventsApi = inject(EventsApiService);

  upcomingEvents: ListEventsQueryDto[] = [];

  ngOnInit(): void {
    const req = new ListEventsRequest();
    req.onlyPublished = true;
    req.paging.pageSize = 3;
    req.paging.page = 1;
    this.eventsApi.list(req).subscribe({
      next: res => this.upcomingEvents = res.items,
      error: () => {}
    });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('bs-BA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}
