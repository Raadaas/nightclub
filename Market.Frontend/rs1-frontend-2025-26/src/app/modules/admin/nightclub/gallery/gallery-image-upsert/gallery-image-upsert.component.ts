import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GalleryApiService } from '../../../../../api-services/gallery/gallery-api.service';
import { ListGalleryImagesQueryDto } from '../../../../../api-services/gallery/gallery-api.models';

export interface GalleryImageDialogData {
  eventId: number;
  displayOrder?: number;
  image?: ListGalleryImagesQueryDto;
}

@Component({
  selector: 'app-gallery-image-upsert',
  standalone: false,
  templateUrl: './gallery-image-upsert.component.html',
  styleUrl: './gallery-image-upsert.component.scss',
})
export class GalleryImageUpsertComponent implements OnInit {
  private fb = inject(FormBuilder);
  private galleryApi = inject(GalleryApiService);
  private dialogRef = inject(MatDialogRef<GalleryImageUpsertComponent>);
  data = inject<GalleryImageDialogData>(MAT_DIALOG_DATA);

  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  get isEdit(): boolean {
    return !!this.data.image;
  }

  ngOnInit(): void {
    const img = this.data.image;
    this.form = this.fb.group({
      imageUrl:     [img?.imageUrl ?? '', Validators.required],
      caption:      [img?.caption ?? '', Validators.maxLength(200)],
      displayOrder: [img?.displayOrder ?? (this.data.displayOrder ?? 1), [Validators.required, Validators.min(1)]],
      isEnabled:    [img?.isEnabled ?? true],
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const v = this.form.value;

    if (this.isEdit) {
      this.galleryApi.update(this.data.image!.id, {
        imageUrl: v.imageUrl.trim(),
        caption: v.caption?.trim() || null,
        displayOrder: v.displayOrder,
        eventId: this.data.eventId,
        isEnabled: v.isEnabled,
      }).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => {
          this.errorMessage = 'Ažuriranje nije uspjelo. Pokušajte ponovo.';
          this.isSubmitting = false;
        },
      });
    } else {
      this.galleryApi.create({
        imageUrl: v.imageUrl.trim(),
        caption: v.caption?.trim() || null,
        displayOrder: v.displayOrder,
        eventId: this.data.eventId,
      }).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => {
          this.errorMessage = 'Dodavanje nije uspjelo. Pokušajte ponovo.';
          this.isSubmitting = false;
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
