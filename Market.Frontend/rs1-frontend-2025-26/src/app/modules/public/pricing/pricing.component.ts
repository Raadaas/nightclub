import { Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MenuCategoriesApiService } from '../../../api-services/menu-categories/menu-categories-api.service';
import { MenuItemsApiService } from '../../../api-services/menu-items/menu-items-api.service';
import { ListMenuCategoriesQueryDto, ListMenuCategoriesRequest } from '../../../api-services/menu-categories/menu-categories-api.models';
import { ListMenuItemsQueryDto, ListMenuItemsRequest } from '../../../api-services/menu-items/menu-items-api.models';

export interface PricingCategory {
  category: ListMenuCategoriesQueryDto;
  items: ListMenuItemsQueryDto[];
}

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent implements OnInit {
  private categoriesApi = inject(MenuCategoriesApiService);
  private itemsApi = inject(MenuItemsApiService);

  groups: PricingCategory[] = [];
  isLoading = true;
  activeCategory: number | null = null;

  ngOnInit(): void {
    const catReq = new ListMenuCategoriesRequest();
    catReq.onlyEnabled = true;
    catReq.paging.pageSize = 100;
    catReq.paging.page = 1;

    const itemReq = new ListMenuItemsRequest();
    itemReq.onlyEnabled = true;
    itemReq.paging.pageSize = 500;
    itemReq.paging.page = 1;

    forkJoin({
      categories: this.categoriesApi.list(catReq),
      items: this.itemsApi.list(itemReq),
    }).subscribe({
      next: ({ categories, items }) => {
        this.groups = categories.items
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(cat => ({
            category: cat,
            items: items.items
              .filter(i => i.menuCategoryId === cat.id)
              .sort((a, b) => a.displayOrder - b.displayOrder),
          }))
          .filter(g => g.items.length > 0);

        if (this.groups.length) {
          this.activeCategory = this.groups[0].category.id;
        }
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  get activeGroup(): PricingCategory | undefined {
    return this.groups.find(g => g.category.id === this.activeCategory);
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' KM';
  }

  categoryIcon(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('koktel')) return 'local_bar';
    if (n.includes('alkohol')) return 'liquor';
    if (n.includes('bezalk')) return 'emoji_food_beverage';
    if (n.includes('hrana')) return 'restaurant_menu';
    if (n.includes('vip')) return 'star';
    return 'local_bar';
  }

  categoryAccent(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('vip')) return 'amber';
    if (n.includes('koktel')) return 'cyan';
    if (n.includes('alkohol')) return 'purple';
    if (n.includes('bezalk')) return 'pink';
    if (n.includes('hrana')) return 'cyan';
    return 'purple';
  }
}
