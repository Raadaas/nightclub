namespace Market.Application.Modules.Nightclub.ClubTables.Queries.List;

public sealed class ListClubTablesQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListClubTablesQuery, PageResult<ListClubTablesQueryDto>>
{
    public async Task<PageResult<ListClubTablesQueryDto>> Handle(ListClubTablesQuery request, CancellationToken ct)
    {
        var q = ctx.ClubTables.AsNoTracking();

        if (request.OnlyEnabled == true)
            q = q.Where(x => x.IsEnabled);

        if (request.IsVip.HasValue)
            q = q.Where(x => x.IsVip == request.IsVip.Value);

        var projected = q.OrderBy(x => x.Name)
            .Select(x => new ListClubTablesQueryDto
            {
                Id = x.Id,
                Name = x.Name,
                Section = x.Section,
                Capacity = x.Capacity,
                MinSpend = x.MinSpend,
                IsVip = x.IsVip,
                Description = x.Description,
                IsEnabled = x.IsEnabled
            });

        return await PageResult<ListClubTablesQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
