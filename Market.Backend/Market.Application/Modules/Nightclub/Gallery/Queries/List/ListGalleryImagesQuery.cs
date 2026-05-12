namespace Market.Application.Modules.Nightclub.Gallery.Queries.List;

public sealed class ListGalleryImagesQuery : BasePagedQuery<ListGalleryImagesQueryDto>
{
    public int? EventId { get; init; }
    public bool? OnlyEnabled { get; init; }
}
