import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemsApiService } from '../../../../../api-services/menu-items/menu-items-api.service';
import { MenuCategoriesApiService } from '../../../../../api-services/menu-categories/menu-categories-api.service';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { UpdateMenuItemCommand, ListMenuItemsQueryDto } from '../../../../../api-services/menu-items/menu-items-api.models';
import { ListMenuCategoriesQueryDto } from '../../../../../api-services/menu-categories/menu-categories-api.models';
import { largePaging } from '../../../../../core/models/paging/paging-utils';

@Component({
  selector: 'app-menu-items-edit',
  standalone: false,
  templateUrl: './menu-items-edit.component.html',
  styleUrl: './menu-items-edit.component.scss',
})
export class MenuItemsEditComponent implements OnInit {
  private api = inject(MenuItemsApiService);
  private categoriesApi = inject(MenuCategoriesApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  categories: ListMenuCategoriesQueryDto[] = [];
  item!: ListMenuItemsQueryDto;

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const stateItem = nav?.extras?.state?.['item'] as ListMenuItemsQueryDto | undefined;

    if (!stateItem) {
      // Try to get from history state if navigation already happened
      const historyState = history.state as any;
      if (historyState?.item) {
        this.item = historyState.item;
      } else {
        this.router.navigate(['/admin/menu-items']);
        return;
      }
    } else {
      this.item = stateItem;
    }

    this.buildForm();
    this.loadCategories();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [this.item.name, [Validators.required, Validators.maxLength(200)]],
      description: [this.item.description || ''],
      price: [this.item.price, [Validators.required, Validators.min(0)]],
      imageUrl: [this.item.imageUrl || ''],
      displayOrder: [this.item.displayOrder, [Validators.required, Validators.min(0)]],
      menuCategoryId: [this.item.menuCategoryId, [Validators.required]],
      isEnabled: [this.item.isEnabled],
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

    const command: UpdateMenuItemCommand = {
      name: this.form.value.name,
      description: this.form.value.description || null,
      price: this.form.value.price,
      imageUrl: this.form.value.imageUrl || null,
      displayOrder: this.form.value.displayOrder,
      menuCategoryId: this.form.value.menuCategoryId,
      isEnabled: this.form.value.isEnabled,
    };

    this.api.update(this.item.id, command).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.success('Stavka menija ažurirana uspješno');
        this.router.navigate(['/admin/menu-items']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Greška pri ažuriranju stavke menija';
        console.error('Update menu item error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/menu-items']);
  }
}
