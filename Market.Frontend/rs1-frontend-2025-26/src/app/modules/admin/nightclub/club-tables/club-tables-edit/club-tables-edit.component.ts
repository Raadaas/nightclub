import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetClubTableByIdQueryDto,
  CreateClubTableCommand,
  UpdateClubTableCommand
} from '../../../../../api-services/club-tables/club-tables-api.models';
import { ClubTablesApiService } from '../../../../../api-services/club-tables/club-tables-api.service';
import { BaseComponent } from '../../../../../core/components/base-classes/base-component';
import { ToasterService } from '../../../../../core/services/toaster.service';

@Component({
  selector: 'app-club-tables-edit',
  standalone: false,
  templateUrl: './club-tables-edit.component.html',
  styleUrl: './club-tables-edit.component.scss'
})
export class ClubTablesEditComponent extends BaseComponent implements OnInit {

  private api = inject(ClubTablesApiService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  isEditMode = false;
  tableId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    this.isEditMode = !!idParam;

    if (this.isEditMode) {
      this.tableId = +idParam;
      this.buildForm();
      this.loadData();
    } else {
      this.buildForm();
    }
  }

  private buildForm(data?: GetClubTableByIdQueryDto): void {
    this.form = this.fb.group({
      name: [data?.name ?? '', [Validators.required, Validators.maxLength(100)]],
      section: [data?.section ?? ''],
      capacity: [data?.capacity ?? null, [Validators.required, Validators.min(1)]],
      minSpend: [data?.minSpend ?? null, [Validators.required, Validators.min(0)]],
      isVip: [data?.isVip ?? false],
      description: [data?.description ?? ''],
      isEnabled: [data?.isEnabled ?? true]
    });
  }

  private loadData(): void {
    this.startLoading();

    this.api.getById(this.tableId).subscribe({
      next: (table) => {
        this.buildForm(table);
        this.stopLoading();
      },
      error: (err) => {
        this.stopLoading('Failed to load club table');
        this.toaster.error('Club table not found');
        console.error('Load club table error:', err);
        this.router.navigate(['/admin/club-tables']);
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

  private create(): void {
    this.startLoading();

    const command: CreateClubTableCommand = {
      name: this.form.value.name,
      section: this.form.value.section || null,
      capacity: this.form.value.capacity,
      minSpend: this.form.value.minSpend,
      isVip: this.form.value.isVip,
      description: this.form.value.description || null
    };

    this.api.create(command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Club table created successfully');
        this.router.navigate(['/admin/club-tables']);
      },
      error: (err) => {
        this.stopLoading('Failed to create club table');
        console.error('Create club table error:', err);
      }
    });
  }

  private update(): void {
    this.startLoading();

    const command: UpdateClubTableCommand = {
      id: this.tableId,
      name: this.form.value.name,
      section: this.form.value.section || null,
      capacity: this.form.value.capacity,
      minSpend: this.form.value.minSpend,
      isVip: this.form.value.isVip,
      description: this.form.value.description || null,
      isEnabled: this.form.value.isEnabled
    };

    this.api.update(this.tableId, command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Club table updated successfully');
        this.router.navigate(['/admin/club-tables']);
      },
      error: (err) => {
        this.stopLoading('Failed to update club table');
        console.error('Update club table error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/club-tables']);
  }

  hasError(controlName: string): boolean {
    const control = this.form?.get(controlName);
    return !!(control && control.touched && control.invalid);
  }
}
