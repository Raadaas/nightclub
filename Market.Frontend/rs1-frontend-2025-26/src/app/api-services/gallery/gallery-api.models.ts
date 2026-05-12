import { PageResult } from '../../core/models/paging/page-result';
import { BasePagedQuery } from '../../core/models/paging/base-paged-query';

export class ListGalleryImagesRequest extends BasePagedQuery {
  eventId?: number | null;
  onlyEnabled?: boolean | null;
}

export interface ListGalleryImagesQueryDto {
  id: number;
  imageUrl: string;
  caption?: string | null;
  displayOrder: number;
  isEnabled: boolean;
  eventId?: number | null;
  eventTitle?: string | null;
}

export type ListGalleryImagesResponse = PageResult<ListGalleryImagesQueryDto>;

export interface CreateGalleryImageCommand {
  imageUrl: string;
  caption?: string | null;
  displayOrder: number;
  eventId?: number | null;
}

export interface UpdateGalleryImageCommand {
  imageUrl: string;
  caption?: string | null;
  displayOrder: number;
  eventId?: number | null;
  isEnabled: boolean;
}
