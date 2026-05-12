import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

// === QUERIES (READ) ===

/**
 * Query parameters for GET /Events
 * Corresponds to: ListEventsQuery.cs
 */
export class ListEventsRequest extends BasePagedQuery {
  search?: string | null;
  onlyPublished?: boolean | null;
}

/**
 * Response item for GET /Events
 * Corresponds to: ListEventsQueryDto.cs
 */
export interface ListEventsQueryDto {
  id: number;
  title: string;
  date: string;
  doorsOpenAt: string;
  mainArtist?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  isEnabled: boolean;
}

/**
 * Response for GET /Events/{id}
 * Corresponds to: GetEventByIdQueryDto.cs
 */
export interface GetEventByIdQueryDto {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  doorsOpenAt: string;
  mainArtist?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  isEnabled: boolean;
  reservationCount: number;
}

/**
 * Paged response for GET /Events
 */
export type ListEventsResponse = PageResult<ListEventsQueryDto>;

// === COMMANDS (WRITE) ===

/**
 * Command for POST /Events
 * Corresponds to: CreateEventCommand.cs
 */
export interface CreateEventCommand {
  title: string;
  description?: string | null;
  date: string;
  doorsOpenAt: string;
  mainArtist?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
}

/**
 * Command for PUT /Events/{id}
 * Corresponds to: UpdateEventCommand.cs
 */
export interface UpdateEventCommand {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  doorsOpenAt: string;
  mainArtist?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  isEnabled: boolean;
}
