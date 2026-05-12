namespace Market.Application.Modules.Nightclub.ClubTables.Queries.GetById;

public class GetClubTableByIdQueryHandler(IAppDbContext ctx)
    : IRequestHandler<GetClubTableByIdQuery, GetClubTableByIdQueryDto>
{
    public async Task<GetClubTableByIdQueryDto> Handle(GetClubTableByIdQuery request, CancellationToken ct)
    {
        var dto = await ctx.ClubTables
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new GetClubTableByIdQueryDto
            {
                Id = x.Id,
                Name = x.Name,
                Section = x.Section,
                Capacity = x.Capacity,
                MinSpend = x.MinSpend,
                IsVip = x.IsVip,
                Description = x.Description,
                IsEnabled = x.IsEnabled
            })
            .FirstOrDefaultAsync(ct);

        if (dto is null)
            throw new MarketNotFoundException($"ClubTable (ID={request.Id}) not found.");

        return dto;
    }
}
