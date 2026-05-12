namespace Market.Application.Modules.Nightclub.Events.Queries.GetById;

public class GetEventByIdQueryHandler(IAppDbContext ctx)
    : IRequestHandler<GetEventByIdQuery, GetEventByIdQueryDto>
{
    public async Task<GetEventByIdQueryDto> Handle(GetEventByIdQuery request, CancellationToken ct)
    {
        var dto = await ctx.Events
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new GetEventByIdQueryDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Date = x.Date,
                DoorsOpenAt = x.DoorsOpenAt,
                MainArtist = x.MainArtist,
                ImageUrl = x.ImageUrl,
                IsPublished = x.IsPublished,
                IsEnabled = x.IsEnabled,
                ReservationCount = x.Reservations.Count()
            })
            .FirstOrDefaultAsync(ct);

        if (dto is null)
            throw new MarketNotFoundException($"Event (ID={request.Id}) not found.");

        return dto;
    }
}
