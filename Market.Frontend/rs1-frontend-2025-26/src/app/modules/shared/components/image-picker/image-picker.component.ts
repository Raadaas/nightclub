import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadApiService } from '../../../../api-services/upload/upload-api.service';

@Component({
  selector: 'app-image-picker',
  standalone: false,
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
})
export class ImagePickerComponent implements ControlValueAccessor {
  @Input() label = 'Slika (opcionalno)';
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  private uploadApi = inject(UploadApiService);

  value = '';
  isUploading = false;
  uploadError = '';
  isDisabled = false;

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor
  writeValue(v: string | null): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.isDisabled = disabled; }

  openFilePicker(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.uploadError = '';
    this.isUploading = true;
    this.onTouched();

    this.uploadApi.upload(file).subscribe({
      next: url => {
        this.value = url;
        this.onChange(url);
        this.isUploading = false;
        // reset so the same file can be re-selected if needed
        input.value = '';
      },
      error: (err: HttpErrorResponse) => {
        const serverMsg = err?.error?.message ?? err?.message ?? '';
        this.uploadError = serverMsg
          ? `Upload nije uspio (${err.status}): ${serverMsg}`
          : `Upload nije uspio (${err.status}). Pokušajte ponovo.`;
        this.isUploading = false;
        input.value = '';
      },
    });
  }

  onUrlInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  clearImage(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
  }
}
