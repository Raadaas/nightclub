import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuCategoriesApiService } from '../../../../../api-services/menu-categories/menu-categories-api.service';
import {
  ListMenuCategoriesQueryDto,
  CreateMenuCategoryCommand,
  UpdateMenuCategoryCommand,
} from '../../../../../api-services/menu-categories/menu-categories-api.models';
import { BaseComponent } from '../../../../../core/components/base-classes/base-component';
import { ToasterService } from '../../../../../core/services/toaster.service';

@Component({
  selector: 'app-menu-category-edit',
  standalone: false,
  templateUrl: './menu-category-edit.component.html',
  styleUrl: './menu-category-edit.component.scss',
})
export class MenuCategoryEditComponent extends BaseComponent implements OnInit {
  private api = inject(MenuCategoriesApiService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  isEditMode = false;
  categoryId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    this.isEditMode = !!idParam;

    if (this.isEditMode) {
      this.categoryId = +idParam;
      // Data passed via navigation state to avoid an extra HTTP call
      const stateCategory = (history.state as any)?.category as ListMenuCategoriesQueryDto | undefined;
      this.buildForm(stateCategory);
    } else {
      this.buildForm();
    }
  }

  private buildForm(data?: ListMenuCategoriesQueryDto): void {
    this.form = this.fb.group({
      name:         [data?.name         ?? '', [Validators.required, Validators.maxLength(100)]],
      displayOrder: [data?.displayOrder ?? 0,  [Validators.required, Validators.min(0)]],
      isEnabled:    [data?.isEnabled    ?? true],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isLoading) return;

    this.isEditMode ? this.update() : this.create();
  }

  private create(): void {
    this.startLoading();
    const command: CreateMenuCategoryCommand = {
      name:         this.form.value.name.trim(),
      displayOrder: this.form.value.displayOrder,
    };

    this.api.create(command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Kategorija menija kreirana uspješno');
        this.router.navigate(['/admin/menu-categories']);
      },
      error: () => {
        this.stopLoading('Greška pri kreiranju kategorije menija');
      },
    });
  }

  private update(): void {
    this.startLoading();
    const command: UpdateMenuCategoryCommand = {
      name:         this.form.value.name.trim(),
      displayOrder: this.form.value.displayOrder,
      isEnabled:    this.form.value.isEnabled,
    };

    this.api.update(this.categoryId, command).subscribe({
      next: () => {
        this.stopLoading();
        this.toaster.success('Kategorija menija ažurirana uspješno');
        this.router.navigate(['/admin/menu-categories']);
      },
      error: () => {
        this.stopLoading('Greška pri ažuriranju kategorije menija');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/menu-categories']);
  }

  hasError(controlName: string): boolean {
    const c = this.form?.get(controlName);
    return !!(c && c.touched && c.invalid);
  }
}
