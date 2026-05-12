namespace Market.Application.Modules.Nightclub.MenuItems.Queries.List;

public sealed class ListMenuItemsQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListMenuItemsQuery, PageResult<ListMenuItemsQueryDto>>
{
    public async Task<PageResult<ListMenuItemsQueryDto>> Handle(ListMenuItemsQuery request, CancellationToken ct)
    {
        var q = ctx.MenuItems.AsNoTracking();

        if (request.OnlyEnabled == true)
            q = q.Where(x => x.IsEnabled);

        if (request.MenuCategoryId.HasValue)
            q = q.Where(x => x.MenuCategoryId == request.MenuCategoryId.Value);

        var projected = q.OrderBy(x => x.DisplayOrder)
            .Select(x => new ListMenuItemsQueryDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Price = x.Price,
                ImageUrl = x.ImageUrl,
                DisplayOrder = x.DisplayOrder,
                IsEnabled = x.IsEnabled,
                MenuCategoryId = x.MenuCategoryId,
                MenuCategoryName = x.MenuCategory.Name
            });

        return await PageResult<ListMenuItemsQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
