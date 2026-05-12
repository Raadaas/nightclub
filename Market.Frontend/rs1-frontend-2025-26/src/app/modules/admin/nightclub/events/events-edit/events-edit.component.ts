import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetEventByIdQueryDto,
  CreateEventCommand,
  UpdateEventCommand
} from '../../../../../api-services/events/events-api.models';
import { EventsApiService } from '../../../../../api-services/events/events-api.service';
import { BaseComponent } from '../../../../../core/components/base-classes/base-component';
import { ToasterService } from '../../../../../core/services/toaster.service';

@Component({
  selector: 'app-events-edit',
  standalone: false,
  templateUrl: './events-edit.component.html',
  styleUrl: './events-edit.component.scss'
})
export class EventsEditComponent extends BaseComponent implements OnInit {

  private api = inject(EventsApiService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  isEditMode = false;
  eventId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    this.isEditMode = !!idParam;

    if (this.isEditMode) {
      this.eventId = +idParam;
      this.buildForm();
      this.loadData();
    } else {
      this.buildForm();
    }
  }

  private buildForm(data?: GetEventByIdQueryDto): void {
    // Convert date string to local date for datepicker
    let dateValue: Date | null = null;
    if (data?.date) {
      dateValue = new Date(data.date);
    }

    // doorsOpenAt comes as TimeSpan ("HH:mm:ss") — extract HH:mm for <input type="time">
    let doorsOpenAtValue = '';
    if (data?.doorsOpenAt) {
      doorsOpenAtValue = data.doorsOpenAt.substring(0, 5);
    }

    this.form = this.fb.group({
      title: [data?.title ?? '', [Validators.required, Validators.maxLength(200)]],
      description: [data?.description ?? ''],
      date: [dateValue, [Validators.required]],
      doorsOpenAt: [doorsOpenAtValue, [Validators.required]],
      mainArtist: [data?.mainArtist ?? ''],
      imageUrl: [data?.imageUrl ?? ''],
      isPublished: [data?.isPublished ?? false],
      isEnabled: [data?.isEnabled ?? true]
    });
  }

  private loadData(): void {
    this.startLoading();

    this.api.getById(this.eventId).subscribe({
      next: (event) => {
        this.buildForm(event);
        this.stopLoading();
      },
      error: (err) => {
        this.stopLoading('Failed to load event');
        this.toaster.error('Event not found');
        console.error('Load event error:', err);
        this.router.navigate(['/admin/events']);
      }
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isLoading) {
      return;
    }

    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  private formatDateForApi(date: Date): string {
    // Format as ISO date string (yyyy-MM-dd)
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatTimeForApi(time: string): string {
    // Input type="time" gives "HH:mm", API expects TimeSpan "HH:mm:ss"
    if (time && time.length === 5) {
      return `${time}:00`;
    }
    return time;
  }

  private create(): void {
    this.startLoading();

    const command: CreateEventCommand = {
      title: this.form.value.title,
      description: this.form.value.description || null,
      date: this.formatDateForApi(this.form.value.date),
      doorsOpenAt: this.formatTimeForApi(this.form.value.doorsOpenAt),
      mainArtist: this.form.value.mainArtist || null,
      imageUrl: this.form.value.imageUrl || null,
      isPublished: this.form.value.isPublished
    };

    this.api.create(command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Event created successfully');
        this.router.navigate(['/admin/events']);
      },
      error: (err) => {
        this.stopLoading('Failed to create event');
        console.error('Create event error:', err);
      }
    });
  }

  private update(): void {
    this.startLoading();

    const command: UpdateEventCommand = {
      id: this.eventId,
      title: this.form.value.title,
      description: this.form.value.description || null,
      date: this.formatDateForApi(this.form.value.date),
      doorsOpenAt: this.formatTimeForApi(this.form.value.doorsOpenAt),
      mainArtist: this.form.value.mainArtist || null,
      imageUrl: this.form.value.imageUrl || null,
      isPublished: this.form.value.isPublished,
      isEnabled: this.form.value.isEnabled
    };

    this.api.update(this.eventId, command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Event updated successfully');
        this.router.navigate(['/admin/events']);
      },
      error: (err) => {
        this.stopLoading('Failed to update event');
        console.error('Update event error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/events']);
  }

  hasError(controlName: string): boolean {
    const control = this.form?.get(controlName);
    return !!(control && control.touched && control.invalid);
  }
}
