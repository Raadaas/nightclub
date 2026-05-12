import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemsApiService } from '../../../../../api-services/menu-items/menu-items-api.service';
import { MenuCategoriesApiService } from '../../../../../api-services/menu-categories/menu-categories-api.service';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { CreateMenuItemCommand } from '../../../../../api-services/menu-items/menu-items-api.models';
import { ListMenuCategoriesQueryDto } from '../../../../../api-services/menu-categories/menu-categories-api.models';
import { largePaging } from '../../../../../core/models/paging/paging-utils';

@Component({
  selector: 'app-menu-items-add',
  standalone: false,
  templateUrl: './menu-items-add.component.html',
  styleUrl: './menu-items-add.component.scss',
})
export class MenuItemsAddComponent implements OnInit {
  private api = inject(MenuItemsApiService);
  private categoriesApi = inject(MenuCategoriesApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  categories: ListMenuCategoriesQueryDto[] = [];

  ngOnInit(): void {
    this.buildForm();
    this.loadCategories();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      displayOrder: [0, [Validators.required, Validators.min(0)]],
      menuCategoryId: [null, [Validators.required]],
    });
  }

  private loadCategories(): void {
    this.categoriesApi.list({ paging: largePaging }).subscribe({
      next: (response) => {
        this.categories = response.items;
      },
      error: (err) => {
        this.toaster.error('Greška pri učitavanju kategorija');
        console.error('Load categories error:', err);
      }
    });
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const command: CreateMenuItemCommand = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      price: this.form.value.price,
      imageUrl: this.form.value.imageUrl || null,
      displayOrder: this.form.value.displayOrder,
      menuCategoryId: this.form.value.menuCategoryId,
    };

    this.api.create(command).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.success('Stavka menija kreirana uspješno');
        this.router.navigate(['/admin/menu-items']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Greška pri kreiranju stavke menija';
        console.error('Create menu item error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/menu-items']);
  }
}
