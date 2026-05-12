// menu-items.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ListMenuItemsRequest,
  ListMenuItemsQueryDto
} from '../../../../api-services/menu-items/menu-items-api.models';
import { MenuItemsApiService } from '../../../../api-services/menu-items/menu-items-api.service';
import { BaseListPagedComponent } from '../../../../core/components/base-classes/base-list-paged-component';
import { DialogHelperService } from '../../../shared/services/dialog-helper.service';
import { DialogButton } from '../../../shared/models/dialog-config.model';

@Component({
  selector: 'app-menu-items',
  standalone: false,
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss'
})
export class MenuItemsComponent
  extends BaseListPagedComponent<ListMenuItemsQueryDto, ListMenuItemsRequest>
  implements OnInit {

  private api = inject(MenuItemsApiService);
  private router = inject(Router);
  private dialogHelper = inject(DialogHelperService);

  displayedColumns: string[] = [
    'name',
    'menuCategoryName',
    'price',
    'displayOrder',
    'isEnabled',
    'actions'
  ];

  constructor() {
    super();
    this.request = new ListMenuItemsRequest();
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
        this.stopLoading('Failed to load menu items');
        console.error('Load menu items error:', err);
      }
    });
  }

  // === UI Actions ===

  onCreate(): void {
    this.router.navigate(['/admin/menu-items/add']);
  }

  onEdit(item: ListMenuItemsQueryDto): void {
    this.router.navigate(['/admin/menu-items', item.id, 'edit'], { state: { item } });
  }

  onDelete(item: ListMenuItemsQueryDto): void {
    this.dialogHelper.confirmDelete(item.name).subscribe(result => {
      if (result && result.button === DialogButton.DELETE) {
        this.performDelete(item);
      }
    });
  }

  private performDelete(item: ListMenuItemsQueryDto): void {
    this.startLoading();

    this.api.delete(item.id).subscribe({
      next: () => {
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'Greška pri brisanju stavke menija'
        ).subscribe();
        console.error('Delete menu item error:', err);
      }
    });
  }

  onSearch(): void {
    this.request.paging.page = 1;
    this.loadPagedData();
  }
}
