namespace Market.Application.Modules.Nightclub.Gallery.Queries.List;

public sealed class ListGalleryImagesQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListGalleryImagesQuery, PageResult<ListGalleryImagesQueryDto>>
{
    public async Task<PageResult<ListGalleryImagesQueryDto>> Handle(ListGalleryImagesQuery request, CancellationToken ct)
    {
        var q = ctx.GalleryImages.AsNoTracking();

        if (request.OnlyEnabled == true)
            q = q.Where(x => x.IsEnabled);

        if (request.EventId.HasValue)
            q = q.Where(x => x.EventId == request.EventId.Value);

        var projected = q.OrderBy(x => x.DisplayOrder)
            .Select(x => new ListGalleryImagesQueryDto
            {
                Id = x.Id,
                ImageUrl = x.ImageUrl,
                Caption = x.Caption,
                DisplayOrder = x.DisplayOrder,
                IsEnabled = x.IsEnabled,
                EventId = x.EventId,
                EventTitle = x.Event != null ? x.Event.Title : null
            });

        return await PageResult<ListGalleryImagesQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
