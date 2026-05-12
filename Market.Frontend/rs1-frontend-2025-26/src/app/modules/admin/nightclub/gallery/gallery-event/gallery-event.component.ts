import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GalleryApiService } from '../../../../../api-services/gallery/gallery-api.service';
import {
  ListGalleryImagesQueryDto,
  ListGalleryImagesRequest,
} from '../../../../../api-services/gallery/gallery-api.models';
import { ListEventsQueryDto } from '../../../../../api-services/events/events-api.models';
import { EventsApiService } from '../../../../../api-services/events/events-api.service';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { DialogHelperService } from '../../../../shared/services/dialog-helper.service';
import { DialogButton } from '../../../../shared/models/dialog-config.model';
import { GalleryImageUpsertComponent } from '../gallery-image-upsert/gallery-image-upsert.component';

@Component({
  selector: 'app-gallery-event',
  standalone: false,
  templateUrl: './gallery-event.component.html',
  styleUrl: './gallery-event.component.scss',
})
export class GalleryEventComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private galleryApi = inject(GalleryApiService);
  private eventsApi = inject(EventsApiService);
  private dialog = inject(MatDialog);
  private toaster = inject(ToasterService);
  private dialogHelper = inject(DialogHelperService);

  eventId!: number;
  event: ListEventsQueryDto | null = null;
  images: ListGalleryImagesQueryDto[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    // Try to get event from navigation state first (avoids an extra HTTP call)
    const stateEvent = (history.state as any)?.event as ListEventsQueryDto | undefined;
    if (stateEvent) {
      this.event = stateEvent;
      this.loadImages();
    } else {
      this.loadEventAndImages();
    }
  }

  private loadEventAndImages(): void {
    this.isLoading = true;
    this.eventsApi.getById(this.eventId).subscribe({
      next: ev => {
        this.event = {
          id: ev.id,
          title: ev.title,
          date: ev.date,
          doorsOpenAt: ev.doorsOpenAt,
          mainArtist: ev.mainArtist,
          imageUrl: ev.imageUrl,
          isPublished: ev.isPublished,
          isEnabled: ev.isEnabled,
        };
        this.loadImages();
      },
      error: () => {
        this.errorMessage = 'Failed to load event.';
        this.isLoading = false;
      },
    });
  }

  loadImages(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const req = new ListGalleryImagesRequest();
    req.eventId = this.eventId;
    req.paging.pageSize = 1000;

    this.galleryApi.list(req).subscribe({
      next: res => {
        this.images = (res.items ?? []).sort((a, b) => a.displayOrder - b.displayOrder);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load gallery images.';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/gallery']);
  }

  openAddDialog(): void {
    const nextOrder = this.images.length > 0
      ? Math.max(...this.images.map(i => i.displayOrder)) + 1
      : 1;

    const ref = this.dialog.open(GalleryImageUpsertComponent, {
      width: '480px',
      panelClass: 'gallery-image-dialog',
      data: { eventId: this.eventId, displayOrder: nextOrder },
    });

    ref.afterClosed().subscribe(saved => {
      if (saved) {
        this.toaster.success('Slika dodana u galeriju');
        this.loadImages();
      }
    });
  }

  openEditDialog(image: ListGalleryImagesQueryDto): void {
    const ref = this.dialog.open(GalleryImageUpsertComponent, {
      width: '480px',
      panelClass: 'gallery-image-dialog',
      data: { image, eventId: this.eventId },
    });

    ref.afterClosed().subscribe(saved => {
      if (saved) {
        this.toaster.success('Slika ažurirana');
        this.loadImages();
      }
    });
  }

  onDelete(image: ListGalleryImagesQueryDto): void {
    this.dialogHelper.confirmDelete(image.caption || 'ovu sliku').subscribe(result => {
      if (result && result.button === DialogButton.DELETE) {
        this.galleryApi.delete(image.id).subscribe({
          next: () => {
            this.toaster.success('Slika obrisana');
            this.loadImages();
          },
          error: () => {
            this.dialogHelper.showError('Error', 'Brisanje nije uspjelo').subscribe();
          },
        });
      }
    });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('bs-BA', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  }
}
