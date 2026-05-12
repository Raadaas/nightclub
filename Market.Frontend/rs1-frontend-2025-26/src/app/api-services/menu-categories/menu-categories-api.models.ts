import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

// === QUERIES (READ) ===

/**
 * Query parameters for GET /MenuCategories
 * Corresponds to: ListMenuCategoriesQuery.cs
 */
export class ListMenuCategoriesRequest extends BasePagedQuery {
  onlyEnabled?: boolean | null;
}

/**
 * Response item for GET /MenuCategories
 * Corresponds to: ListMenuCategoriesQueryDto.cs
 */
export interface ListMenuCategoriesQueryDto {
  id: number;
  name: string;
  displayOrder: number;
  isEnabled: boolean;
}

/**
 * Paged response for GET /MenuCategories
 */
export type ListMenuCategoriesResponse = PageResult<ListMenuCategoriesQueryDto>;

// === COMMANDS (WRITE) ===

/**
 * Command for POST /MenuCategories
 * Corresponds to: CreateMenuCategoryCommand.cs
 */
export interface CreateMenuCategoryCommand {
  name: string;
  displayOrder: number;
}

/**
 * Command for PUT /MenuCategories/{id}
 * Corresponds to: UpdateMenuCategoryCommand.cs
 */
export interface UpdateMenuCategoryCommand {
  name: string;
  displayOrder: number;
  isEnabled: boolean;
}
