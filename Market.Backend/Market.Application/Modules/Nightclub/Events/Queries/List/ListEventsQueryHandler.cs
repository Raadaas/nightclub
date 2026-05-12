namespace Market.Application.Modules.Nightclub.Events.Queries.List;

public sealed class ListEventsQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListEventsQuery, PageResult<ListEventsQueryDto>>
{
    public async Task<PageResult<ListEventsQueryDto>> Handle(ListEventsQuery request, CancellationToken ct)
    {
        var q = ctx.Events.AsNoTracking();

        if (request.OnlyPublished == true)
            q = q.Where(x => x.IsPublished && x.IsEnabled);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim().ToLower();
            q = q.Where(x => x.Title.ToLower().Contains(term) || (x.MainArtist != null && x.MainArtist.ToLower().Contains(term)));
        }

        var projected = q.OrderByDescending(x => x.Date)
            .Select(x => new ListEventsQueryDto
            {
                Id = x.Id,
                Title = x.Title,
                Date = x.Date,
                DoorsOpenAt = x.DoorsOpenAt,
                MainArtist = x.MainArtist,
                ImageUrl = x.ImageUrl,
                IsPublished = x.IsPublished,
                IsEnabled = x.IsEnabled
            });

        return await PageResult<ListEventsQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
