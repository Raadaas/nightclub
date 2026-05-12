namespace Market.Application.Modules.Nightclub.MenuCategories.Queries.List;

public sealed class ListMenuCategoriesQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListMenuCategoriesQuery, PageResult<ListMenuCategoriesQueryDto>>
{
    public async Task<PageResult<ListMenuCategoriesQueryDto>> Handle(ListMenuCategoriesQuery request, CancellationToken ct)
    {
        var q = ctx.MenuCategories.AsNoTracking();

        if (request.OnlyEnabled == true)
            q = q.Where(x => x.IsEnabled);

        var projected = q.OrderBy(x => x.DisplayOrder)
            .Select(x => new ListMenuCategoriesQueryDto
            {
                Id = x.Id,
                Name = x.Name,
                DisplayOrder = x.DisplayOrder,
                IsEnabled = x.IsEnabled
            });

        return await PageResult<ListMenuCategoriesQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
