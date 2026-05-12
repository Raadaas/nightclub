import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

// === QUERIES (READ) ===

/**
 * Query parameters for GET /MenuItems
 * Corresponds to: ListMenuItemsQuery.cs
 */
export class ListMenuItemsRequest extends BasePagedQuery {
  menuCategoryId?: number | null;
  onlyEnabled?: boolean | null;
  search?: string | null;
}

/**
 * Response item for GET /MenuItems
 * Corresponds to: ListMenuItemsQueryDto.cs
 */
export interface ListMenuItemsQueryDto {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  displayOrder: number;
  isEnabled: boolean;
  menuCategoryId: number;
  menuCategoryName: string;
}

/**
 * Paged response for GET /MenuItems
 */
export type ListMenuItemsResponse = PageResult<ListMenuItemsQueryDto>;

// === COMMANDS (WRITE) ===

/**
 * Command for POST /MenuItems
 * Corresponds to: CreateMenuItemCommand.cs
 */
export interface CreateMenuItemCommand {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  displayOrder: number;
  menuCategoryId: number;
}

/**
 * Command for PUT /MenuItems/{id}
 * Corresponds to: UpdateMenuItemCommand.cs
 */
export interface UpdateMenuItemCommand {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  displayOrder: number;
  menuCategoryId: number;
  isEnabled: boolean;
}
