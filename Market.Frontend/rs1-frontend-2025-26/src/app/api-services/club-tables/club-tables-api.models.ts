import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

// === QUERIES (READ) ===

/**
 * Query parameters for GET /ClubTables
 * Corresponds to: ListClubTablesQuery.cs
 */
export class ListClubTablesRequest extends BasePagedQuery {
  isVip?: boolean | null;
  onlyEnabled?: boolean | null;
}

/**
 * Response item for GET /ClubTables
 * Corresponds to: ListClubTablesQueryDto.cs
 */
export interface ListClubTablesQueryDto {
  id: number;
  name: string;
  section?: string | null;
  capacity: number;
  minSpend: number;
  isVip: boolean;
  description?: string | null;
  isEnabled: boolean;
}

/**
 * Response for GET /ClubTables/{id}
 * Corresponds to: GetClubTableByIdQueryDto.cs
 */
export interface GetClubTableByIdQueryDto {
  id: number;
  name: string;
  section?: string | null;
  capacity: number;
  minSpend: number;
  isVip: boolean;
  description?: string | null;
  isEnabled: boolean;
}

/**
 * Paged response for GET /ClubTables
 */
export type ListClubTablesResponse = PageResult<ListClubTablesQueryDto>;

// === COMMANDS (WRITE) ===

/**
 * Command for POST /ClubTables
 * Corresponds to: CreateClubTableCommand.cs
 */
export interface CreateClubTableCommand {
  name: string;
  section?: string | null;
  capacity: number;
  minSpend: number;
  isVip: boolean;
  description?: string | null;
}

/**
 * Command for PUT /ClubTables/{id}
 * Corresponds to: UpdateClubTableCommand.cs
 */
export interface UpdateClubTableCommand {
  id: number;
  name: string;
  section?: string | null;
  capacity: number;
  minSpend: number;
  isVip: boolean;
  description?: string | null;
  isEnabled: boolean;
}
