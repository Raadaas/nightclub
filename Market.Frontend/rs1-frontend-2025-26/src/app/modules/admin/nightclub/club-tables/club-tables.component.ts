import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ListClubTablesRequest,
  ListClubTablesQueryDto
} from '../../../../api-services/club-tables/club-tables-api.models';
import { ClubTablesApiService } from '../../../../api-services/club-tables/club-tables-api.service';
import { BaseListPagedComponent } from '../../../../core/components/base-classes/base-list-paged-component';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DialogHelperService } from '../../../shared/services/dialog-helper.service';
import { DialogButton } from '../../../shared/models/dialog-config.model';

@Component({
  selector: 'app-club-tables',
  standalone: false,
  templateUrl: './club-tables.component.html',
  styleUrl: './club-tables.component.scss'
})
export class ClubTablesComponent
  extends BaseListPagedComponent<ListClubTablesQueryDto, ListClubTablesRequest>
  implements OnInit {

  private api = inject(ClubTablesApiService);
  private router = inject(Router);
  private toaster = inject(ToasterService);
  private dialogHelper = inject(DialogHelperService);

  displayedColumns: string[] = [
    'name',
    'section',
    'capacity',
    'minSpend',
    'isVip',
    'isEnabled',
    'actions'
  ];

  constructor() {
    super();
    this.request = new ListClubTablesRequest();
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
        this.stopLoading('Failed to load club tables');
        console.error('Load club tables error:', err);
      }
    });
  }

  // === UI Actions ===

  onCreate(): void {
    this.router.navigate(['/admin/club-tables/add']);
  }

  onEdit(table: ListClubTablesQueryDto): void {
    this.router.navigate(['/admin/club-tables', table.id, 'edit']);
  }

  onDelete(table: ListClubTablesQueryDto): void {
    this.dialogHelper.confirmDelete(table.name).subscribe(result => {
      if (result && result.button === DialogButton.DELETE) {
        this.performDelete(table);
      }
    });
  }

  private performDelete(table: ListClubTablesQueryDto): void {
    this.startLoading();

    this.api.delete(table.id).subscribe({
      next: () => {
        this.toaster.success('Club table deleted successfully');
        this.loadPagedData();
      },
      error: (err) => {
        this.stopLoading();
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'CLUB_TABLES.DIALOGS.ERROR_DELETE'
        ).subscribe();
        console.error('Delete club table error:', err);
      }
    });
  }
}
