import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListPagedComponent } from '../../../../core/components/base-classes/base-list-paged-component';
import { MenuCategoriesApiService } from '../../../../api-services/menu-categories/menu-categories-api.service';
import { DialogHelperService } from '../../../shared/services/dialog-helper.service';
import { DialogButton } from '../../../shared/models/dialog-config.model';
import {
  ListMenuCategoriesRequest,
  ListMenuCategoriesQueryDto,
} from '../../../../api-services/menu-categories/menu-categories-api.models';

@Component({
  selector: 'app-menu-categories',
  standalone: false,
  templateUrl: './menu-categories.component.html',
  styleUrl: './menu-categories.component.scss',
})
export class MenuCategoriesComponent
  extends BaseListPagedComponent<ListMenuCategoriesQueryDto, ListMenuCategoriesRequest>
  implements OnInit
{
  private api = inject(MenuCategoriesApiService);
  private router = inject(Router);
  private dialogHelper = inject(DialogHelperService);

  displayedColumns: string[] = ['name', 'displayOrder', 'isEnabled', 'actions'];
  showOnlyEnabled = true;

  constructor() {
    super();
    this.request = new ListMenuCategoriesRequest();
    this.request.paging.pageSize = 5;
    this.request.onlyEnabled = true;
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
        this.stopLoading('Failed to load menu categories');
        console.error('Load menu categories error:', err);
      },
    });
  }

  // === Filters ===

  onToggleEnabledFilter(checked: boolean): void {
    this.showOnlyEnabled = checked;
    this.request.onlyEnabled = checked ? true : undefined;
    this.request.paging.page = 1;
    this.loadPagedData();
  }

  // === CRUD Actions ===

  onCreate(): void {
    this.router.navigate(['/admin/menu-categories/add']);
  }

  onEdit(category: ListMenuCategoriesQueryDto): void {
    this.router.navigate(['/admin/menu-categories', category.id, 'edit'], {
      state: { category },
    });
  }

  onDelete(category: ListMenuCategoriesQueryDto): void {
    this.dialogHelper.confirmDelete(category.name).subscribe(result => {
      if (result && result.button === DialogButton.DELETE) {
        this.performDelete(category);
      }
    });
  }

  private performDelete(category: ListMenuCategoriesQueryDto): void {
    this.startLoading();

    this.api.delete(category.id).subscribe({
      next: () => {
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'Greška pri brisanju kategorije menija'
        ).subscribe();
        console.error('Delete menu category error:', err);
      },
    });
  }
}
