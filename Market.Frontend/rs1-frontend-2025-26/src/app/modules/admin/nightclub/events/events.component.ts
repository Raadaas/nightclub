import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ListEventsRequest,
  ListEventsQueryDto
} from '../../../../api-services/events/events-api.models';
import { EventsApiService } from '../../../../api-services/events/events-api.service';
import { BaseListPagedComponent } from '../../../../core/components/base-classes/base-list-paged-component';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DialogHelperService } from '../../../shared/services/dialog-helper.service';
import { DialogButton } from '../../../shared/models/dialog-config.model';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent
  extends BaseListPagedComponent<ListEventsQueryDto, ListEventsRequest>
  implements OnInit {

  private api = inject(EventsApiService);
  private router = inject(Router);
  private toaster = inject(ToasterService);
  private dialogHelper = inject(DialogHelperService);

  displayedColumns: string[] = [
    'title',
    'date',
    'doorsOpenAt',
    'mainArtist',
    'isPublished',
    'isEnabled',
    'actions'
  ];

  constructor() {
    super();
    this.request = new ListEventsRequest();
    this.request.paging.pageSize = 5;
  }

  ngOnInit(): void {
    this.initList();
  }

  protected loadPagedData(): void {
    this.startLoading();

    this.api.list(this.request).subscribe({
      next: (response) => {
        this.handlePageResult(response);
        this.stopLoading();
      },
      error: (err) => {
        this.stopLoading('Failed to load events');
        console.error('Load events error:', err);
      }
    });
  }

  // === UI Actions ===

  onCreate(): void {
    this.router.navigate(['/admin/events/add']);
  }

  onEdit(event: ListEventsQueryDto): void {
    this.router.navigate(['/admin/events', event.id, 'edit']);
  }

  onDelete(event: ListEventsQueryDto): void {
    this.dialogHelper.confirmDelete(event.title).subscribe(result => {
      if (result && result.button === DialogButton.DELETE) {
        this.performDelete(event);
      }
    });
  }

  private performDelete(event: ListEventsQueryDto): void {
    this.startLoading();

    this.api.delete(event.id).subscribe({
      next: () => {
        this.toaster.success('Event deleted successfully');
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'EVENTS.DIALOGS.ERROR_DELETE'
        ).subscribe();
        console.error('Delete event error:', err);
      }
    });
  }

  onSearch(): void {
    this.request.paging.page = 1;
    this.loadPagedData();
  }

  formatDoorsOpenAt(doorsOpenAt: string): string {
    if (!doorsOpenAt) return '—';
    // TimeSpan comes as "HH:mm:ss" or "HH:mm:ss.fffffff"
    return doorsOpenAt.substring(0, 5);
  }
}
